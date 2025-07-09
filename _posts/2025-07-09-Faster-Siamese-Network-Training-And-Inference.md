---
title: 'Faster Siamese Network Training and Inference'
permalink: /posts/2025/07/faster-siamese-network-training-and-inference/
tags:
- Siamese neural networks
- machine learning
---

In this post, I look at a couple of ways you can dramatically speed up 
training of Siamese neural networks.
These are two relatively simple tricks that I've not seen anywhere else which,
when combined, can give a greater than 2x speed-up when training Siamese networks
on GPU in PyTorch.

## Siamese Networks, Very Briefly

Siamese neural networks are machine learning models designed to evaluate how similar two inputs are, usually in order
to determine if they are of the same class.

They work by having two identical subnetworks, which share the same architecture and weights, processing the
two inputs to construct two independent feature vectors, which are then compared, either with an explicitly computed distance
metric (such as Euclidean distance) or by concatenating the two vectors and feeding them into the next stage of the
network.

The following diagram gives the general structure of these networks:

<div style="text-align: center;">
<img src="images/standard_siamese.png" alt="Siamese network diagrams" width="300" style="display: block; margin: 0 auto;">
</div>

Internally, the two inputs are processed in parallel by the two identical subnetworks,
producing intermediate representations that are compared in a separate part of the
network to produce a model output.

This kind of network is especially useful if you know the category of objects that you want to classify but not all the members of that category.
For example, if you're training a model for facial recognition, you may not know in advance all the faces you wish to identify, even
if you know that the task you want to perform is identifying specific people.

By training the network to categorise pairs of images as "same" or "different", if you later want to identify a person who is not
in your training set, you can start running facial recognition to identify that person with a single reference image.


## Optimisation 1: Reducing Subnetwork Calls

The first trick for speeding up Siamese neural networks is applicable for both training and inference, and can be summarised succinctly as:
_batch your inputs together rather than calling the model twice._

A typical Siamese network implemented in PyTorch might follow a template such as this:[^imp_note]

```python

class SiameseNetwork(nn.Module):
    """Initialise the network and subnetwork"""
    def __init__(self, *args):
        super(SiameseNetwork, self).__init__()
        ...

    def forward_once(self, x):
        """Forward pass for one input"""
        ...
        return output

    def forward(self, input1, input2):
        """Forward pass for a pair of inputs"""
        output1 = self.forward_once(input1)
        output2 = self.forward_once(input2)
        return output1, output2
```

While Siamese networks are described as having two identical networks, this is not 
how they are implemented.
The actual implementation is just a single network
that is passed both inputs to process in sequence.

But since it is just the same network being called twice, we can make the implementation
more efficient simply by concatenating the inputs in the batch dimension, 
calling the network once then undoing the concatenation on the outputs.
With such an approach, the forward method would look as follows:

```python
    def forward(self, input1, input2):
        """Forward pass for a pair of inputs"""

        """Stack the inputs, doubling the batch size"""
        stacked_input = torch.cat([input1, input2], 0)
        output = self.forward_once(stacked_input)

        # Split the output back into two embeddings
        output1, output2 = torch.chunk(output, chunks=2, dims=0)

        return output1, output2
```

These two different implementation strategies are visualised in the following diagram:

<div style="text-align: center;">
<img src="images/siamese%20diagrams.png" alt="Siamese network diagrams" width="600" style="display: block; margin: 0 auto;">
</div>

The second approach should be more efficient, since it allows the network to make full use of the 
GPU's parallelism.
To test this idea, we consider a Siamese network based on the one found in the [PyTorch
examples](https://github.com/pytorch/examples/tree/main/siamese_network). This network uses a ResNet18 as the base model for its subnetwork, removing
the last layer and concatenating the features from both outputs to be fed into an MLP
with a single layer to produce an overall output. For our experiments, we use CIFAR100 as 
our dataset.
All experiments can be found at [this link](https://github.com/EchoStatements/faster-siamese-networks).

We test the time it takes to perform inference on 
a randomly initialised network, recording the amount of time taken to perform inference
on 10 passes through the dataset, performing inference on a total of 100,000 image pairs,
reporting the results in the figure below.


<div style="text-align: center;">
<img src="images/inference_speedup.png" alt="Fast inference performance comparison" width="700" style="display: block; margin: 0 auto;">
</div>

From this test, we can see that this one change alone allows us a 33% saving in the 
time cost of running the network.

So why isn't this standard practice? In researching this post, I couldn't
find _any_ Siamese networks that are implemented this way!

It seems likely to me the reason is just that Siamese neural networks are described as consisting of two identical subnetworks (and even the name implies it) rather than being described
as a single network acting on two inputs. Even though these two descriptions are equivalent, when implementing a network with this mental model
in mind, it feels more natural to think of inputs passing through the networks as
two different function calls.

One important caveat for this new approach is that though the speed-up persists at all batch sizes, it is most dramatic for small batches.

Running the same test for batch sizes ranging from 16 to 16,384, quadrupling each time,
we see that as batch size increases, the effect of this strategy decreases.

<div style="text-align: center;">
<img src="images/speedup.png" alt="CIFAR100 training results" width="600" style="display: block; margin: 0 auto;">
</div>

However, we can also see that for larger batch sizes, the inference speed of the network
drops for both implementations, and most importantly, we see that at the batch size
that allows maximum throughput, there is still a small but significant speed up of 6%
using the faster method. 

<div style="text-align: center;">
<img src="images/inference_time.png" alt="CIFAR100 training results" width="600" style="display: block; margin: 0 auto;">
</div>


<div style="text-align: center;">
<img src="images/throughput.png" alt="CIFAR100 training results" width="600" style="display: block; margin: 0 auto;">
</div>

To measure the effect of using this new method on training, we perform a similar 
experiment but this time whilst iterating through the data, we also compare the model's
prediction to the target using the binary cross-entropy loss, back-propagate through
the network and update the weights using an Adam optimser.

<div style="text-align: center;">
<img src="images/training_time.png" alt="Faster inference effect on training" width="600" style="display: block; margin: 0 auto;">
</div>

Here, we see a speed-up of 37.5%, suggesting that this optimisation affects not just 
the forward pass through the model but also offers a benefit of similar magnitude
during the backward pass during training. 


## Optimisation 2: Data Efficient Training

For the second optimisation, we examine how training data can be used more effectively.

When training Siamese networks, it is desirable to balance example pairs which are of 
the same class and example pairs that of different classes. A common strategy for doing
this is to shuffle your training examples, then iterate through them; while iterating
through, you alternate between randomly selecting a sample from the same class (creating
a positive pair) and from a different class (creating a negative pair).

Using such a method will give you batches that look like the following:

<div style="text-align: center;">
<img src="images/standard_batch.png" alt="CIFAR100 training results" width="300" style="display: block; margin: 0 auto;">
</div>

However, this process is not very efficient. On average, an 
example will appear twice in an epoch: it's guaranteed to be drawn once as the first
element of the pair, and on average will also be drawn once as the second element.
In doing so, it will be passed through the subnetwork twice, constructing 
a representation for that input each time.

To make this process more efficient, we design training so that whenever a 
generated a representation for an input is generated by the network, it is by default
used twice within the same batch.

To do this, we generate _only_ positive example pairs, making sure that no two
consecutive pairs in a batch have the same class but are otherwise randomly ordered. 
After generating the representations
for the entire batch, we can use the pairs as positive examples, then
shift the indices of the second example by one to generate the negative examples. This
can be visualised like so:


<div style="text-align: center;">
<img src="images/new_dataset_2.png" alt="Data optimization strategy diagram" width="900" style="display: block; margin: 0 auto;">
</div>

In short, we evaluate all pairs on the positive samples, then roll the _outputs_, 
not the inputs to create the negatively labelled pairs.

Given a dataloader which generates pairs such that no two consecutive pairs in a 
batch are of the same class (including the first pair and last pair), a training 
epoch for this method would look something like the following:

```python
for batch_idx, (images_1, images_2) in enumerate(train_loader):

    # Load in pairs of similar images
    # images_1 and images_2 are both of shape (batch_size, ...)
    images_1, images_2 = images_1.to(device), images_2.to(device)
    optimizer.zero_grad()
    
    # First examples: assume same class (positive pairs)
    same_class_targets = torch.ones(len(images_1)).to(device)
    
    # Collect model outputs
    output1, output2 = model(images_1, images_2)
    outputs_same = torch.cat((output1, output2), dim=0)

    # Second examples: roll second image tensor and assume different classes (negative pairs)
    different_class_targets = torch.zeros(len(images_1)).to(device)
    outputs_different = torch.cat((output2, torch.roll(output1, shifts=-1, dims=0)), dim=1).to(device)

    predictions = model.get_prediction_from_embeddings(torch.cat((outputs_same
                                                                 outputs_different)).squeeze()

    targets = torch.cat((same_class_targets, different_class_targets))

    total_loss = criterion(predictions, targets)
    total_loss.backward()
    optimizer.step()

```

Here, we see how even though the images only pass through `model` once, the outputs
they generate are combined in two different ways to generate two distinct predictions.

In order to compare this new method to the classic method of training, we first need to
decide what constitutes an epoch for this new training method. For the classic training,
we iterate through example images so that every image in the training set is the first
image in a pair exactly once. However, using our new method, each image appears as
the first of an example pair twice (and therefore on average four times per epoch
in total). 

This means that, in essence, batches and epochs using our new approach contain 
twice as many examples:

![img.png](images/batch_comparison.png)

In order to do fair comparisons, for faster training, we will test both "full" epoch
training, which calculates twice as many losses as the classic algorithm, and "half" 
epoch training, where we stop the epoch after we reach the same number samples that the
classic algorithm stops at. 
In practice, the "full" method is probably preferable, with the "half" method being 
useful here only for providing a like-for-like comparison.[^train]

First we look at the validation loss over time for 15 epochs of training using the
"half" approach:

<div style="text-align: center;">
<img src="images/faster_train_final.png" alt="Siamese network diagrams" width="600" style="display: block; margin: 0 auto;">
</div>

Here, we see that the faster method offers a signficant speed-up over the classic method,
taking less time overall whilst still reaching the same level of accuracy on unseen data.

Next, we compare against the "full" method:

<div style="text-align: center;">
<img src="images/full_final.png" alt="Full training" width="600" style="display: block; margin: 0 auto 10px auto;">
</div>

Here, we see that using full batches, though training takes longer overall, for the same
number of epochs, the rate of improvement is much faster, meaning that the time that
would be needed in order to reach convergence would be less. It also appears that the 
performance of the network is improved by the faster training regime. Further investigation
is required to establish exactly what about this alternate training strategy improves
performance in this case.[^better]


# Applying Both Optimisations

Finally, we look at the effect of using both optimisations at the same time. Training a
networks using all four combinations of classic/faster training and classic/faster 
model, we can see the importance of both our optimisations for speeding up the model.

We train both classic and faster models with the classic and faster training methods,
in both cases using 50,000 samples per epoch, for 15 epochs each.

<div style="text-align: center;">
<img src="images/conclusion_comparison.png" alt="Siamese network diagrams" width="600" style="display: block; margin: 0 auto;">
</div>

Here, we see that when combined, these two tricks give a dramatic speed-up, with
training time going from 236.3 seconds using the original implementation to 94.3 
seconds with both the faster model and faster training method. This is accomplished with
no drop in classification accuracy (in fact, there is a slight improvement
from 68.47% to 70.04%).

We also see how both the faster model and faster training contribute about equally to
the speed-up, with the faster training method's contribution being slightly larger. The
training time is 142.3 seconds and 140.8 seconds for faster training only and faster
model only, respectively. The equivalence here may be due to the fact that in isolation
they serve the same role: to halve the number of subnetwork calls 
for every example seen by the loss function.

# What's Next?

The two optimisations presented here offer significant speedup to Siamese network training, and 
when combined reduce the training time by significantly more than half.
Though the faster training method modifies the training algorithm, it does so in a way
where the effects on performance---whether positive or negative---appear to be negligible.

Further optimisations may be possible in the training algorithm, if multiple examples 
pairs from the same class are present in a batch, then the representations could be 
used more than twice, with the difficulty coming in ensure that the matching vs 
non-matching pairs appear with similar frequencies.

An obvious extension to the training approach would be to apply the same method to the 
triplet loss. This could again work by arranging the training batches in matching pairs
and having each inputs representation successively as a positive example, 
negative example and anchor, though experiments would have to be done to ensure that 
this does not affect performance.

_Thanks to [D. Lowl](https://bsky.app/profile/d-lowl.bsky.social) and [Sara Summerton](https://github.com/sara-es) for their feedback on earlier drafts of this post_

## Citation

You can cite this blog post with the following bibtex:

```bibtex
@misc{woood2025siamese,
  author = {Wood, Danny},
  title = {Faster Siamese Network Training And Inference},
  year = {2025},
  howpublished = {Blog post},
  url = {https://echostatements.github.io/posts/2025/07/faster-siamese-network-training-and-inference/}
}
```

[^imp_note]: It seems that the typical implementation of Siamese neural networks omit the comparison of the two outputs from the `forward` method, leaving it to be done elsewhere. This is a practice that we adopt, since it will be useful for the second optimisation. 

[^train]: Because the example network used in this blog post is not symmetrical with respect to inputs, we also swap placement of the reference and input representations in order to give more varied inputs. In general, this should not be necessary.

[^better]: My suspicion is that this is a quirk of the implementation detail mentioned in the above footnote. The faster training regime with full batches guarantees that every example is seen in both input slots every epoch. It is not clear that the benefit would persist if the comparison was done using, say, Euclidean distance.