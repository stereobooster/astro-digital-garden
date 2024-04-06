---
title: Other diagrams
tags: [component]
sidebar:
  label: Other diagrams 🚧
---

Mermaid (see [[diagrams-support-in-markdown]]) is good for traditional software-related diagrams, like UML, ER, flow-graph etc. But sometimes you need something else

## My wishlist

### Timeline

See [[timeline-diagram]].

### Euler diagram

Often confused with Venn diagrams.

Examples:

- [A Better Algorithm for Area Proportional Venn and Euler Diagrams](https://www.benfrederickson.com/better-venn-diagrams/)
  - [code](https://github.com/benfred/venn.js) (depends on d3)
    - [maintained fork](https://github.com/upsetjs/venn.js)
    - the lazy solution to render on the server would be to use headless browser, the same way as in [mermaid-isomorphic](https://github.com/remcohaszing/mermaid-isomorphic/)
- [eulerdiagrams.org](https://www.eulerdiagrams.org/)

Papers:

- [Euler diagrams drawn with ellipses area-proportionally (Edeap)](https://bmcbioinformatics.biomedcentral.com/articles/10.1186/s12859-021-04121-8)
  - [code](https://github.com/mjwybrow/edeap)
  - [playground](https://www.eulerdiagrams.org/edeap/)
- [eulerr: Area-Proportional Euler Diagrams with Ellipses](https://lup.lub.lu.se/luur/download?func=downloadFile&recordOId=8934042&fileOId=8934043)
  - [code](https://github.com/jolars/eulerr2017bsc) (R)
- [SPEULER: Semantics-preserving Euler Diagrams](https://www.yunhaiwang.net/Vis2021/speuler/vis21b-sub1477-cam-i7.pdf)
- [EVenn: Easy to create statistically measurable Venn diagrams online](http://www.ehbio.com/test/venn/VennDoc/EVennDoc/index.html)
- [nVenn: generalized, quasi-proportional Venn and Euler diagrams](https://academic.oup.com/bioinformatics/article/34/13/2322/4904268)
- [UpSetR: An R Package For The Visualization Of Intersecting Sets And Their Properties](https://upset.app/)
  - [code](https://upset.js.org/)
- [Exact and Approximate Area-proportional Circular Venn and Euler Diagrams](https://www.cs.uic.edu/~wilkinson/Publications/venneuler.pdf)
- [DeepVenn – creation of area-proportional Venn diagrams using Tensorflow](https://arxiv.org/ftp/arxiv/papers/2210/2210.04597.pdf)
- [A Survey of Euler Diagrams](https://kar.kent.ac.uk/35163/1/JVLC_Euler_Survey.pdf)
- [Realizability of Rectangular Euler Diagrams](https://arxiv.org/pdf/2403.03801.pdf)
- [Generating and Navigating Large Euler Diagrams](https://ceur-ws.org/Vol-1244/ED-paper3.pdf)

### Hasse diagram

aka concept lattice, aka poset, aka partially ordered set

Examples:

- [Hasse Diagrams of Integer Divisors](https://demonstrations.wolfram.com/HasseDiagramsOfIntegerDivisors/)
- [DrawSimplePosets](https://github.com/scheinerman/DrawSimplePosets.jl)

Papers:

- [Yet a Faster Algorithm for Building the Hasse Diagram of a Concept Lattice](https://upcommons.upc.edu/bitstream/handle/2117/9034/icfca09.pdf)
- [Border Algorithms for Computing Hasse Diagrams of Arbitrary Lattices](https://core.ac.uk/download/pdf/41766685.pdf)
- [Lattice Drawing. Survey of Approaches, Geometric Method and Existing Software](https://phoenix.inf.upol.cz/~outrata/download/texts/LatDrawing-slides.pdf)
- [Automated Lattice Drawing](https://math.hawaii.edu/~ralph/Preprints/latdrawing.pdf)
- [Confluent Hasse diagrams](https://arxiv.org/pdf/1108.5361.pdf)

## Ideas

Maybe try [penrose](https://github.com/penrose/penrose)?
