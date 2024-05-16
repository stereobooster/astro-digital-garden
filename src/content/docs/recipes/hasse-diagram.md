---
title: Hasse diagram
tags: [diagram]
sidebar:
  label: Hasse diagram 🚷
description: Convenient way to visualize concepts
---

```dot
digraph hasse {
  bgcolor="transparent";
  node [shape=plaintext]
  edge [arrowhead=vee minlen=1];
  
  E[label="∅"]
  x[label="{x}"]
  y[label="{y}"]
  z[label="{z}"]
  xy[label="{x, y}"]
  yz[label="{y, z}"]
  xz[label="{x, z}"]
  xyz[label="{x, y, z}"]
  
  E -> x
  E -> y
  E -> z
  x -> xy
  y -> xy
  z -> yz
  x -> xz
  y -> yz
  z -> xz
  xy -> xyz
  xz -> xyz
  yz -> xyz
  
  x -> y -> z [style=invis minlen=5]
  xy -> xz -> yz [style=invis minlen=5]
  { rank=same; y x z }
  { rank=same; xy yz xz }
}
```

**aka**: concept lattice, poset, partially ordered set

## Theory

- [Automated Lattice Drawing](https://math.hawaii.edu/~ralph/Preprints/latdrawing.pdf), 2004
- [Yet a Faster Algorithm for Building the Hasse Diagram of a Concept Lattice](https://upcommons.upc.edu/bitstream/handle/2117/9034/icfca09.pdf), 2009
- [Lattice Drawing. Survey of Approaches, Geometric Method and Existing Software](https://phoenix.inf.upol.cz/~outrata/download/texts/LatDrawing-slides.pdf), 2009
- [Border Algorithms for Computing Hasse Diagrams of Arbitrary Lattices](https://core.ac.uk/download/pdf/41766685.pdf), 2011
- [Confluent Hasse diagrams](https://arxiv.org/pdf/1108.5361.pdf), 2018

## References

- [Hasse Diagrams of Integer Divisors](https://demonstrations.wolfram.com/HasseDiagramsOfIntegerDivisors/)

## Workaround

You may create Hasse diagram manually, for example, using [[graphviz-diagram]]. Diagram above created with follwing code:

```
digraph hasse {
  bgcolor="transparent";
  node [shape=plaintext]
  edge [arrowhead=vee minlen=1];

  E[label="∅"]
  x[label="{x}"]
  y[label="{y}"]
  z[label="{z}"]
  xy[label="{x, y}"]
  yz[label="{y, z}"]
  xz[label="{x, z}"]
  xyz[label="{x, y, z}"]

  E -> x
  E -> y
  E -> z
  x -> xy
  y -> xy
  z -> yz
  x -> xz
  y -> yz
  z -> xz
  xy -> xyz
  xz -> xyz
  yz -> xyz

  x -> y -> z [style=invis minlen=5]
  xy -> xz -> yz [style=invis minlen=5]
  { rank=same; y x z }
  { rank=same; xy yz xz }
}
```
