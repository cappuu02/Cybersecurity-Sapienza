```ad-abstract
title: Definition
A **distributed system** is a set of spatially separate entities, each of these with a certain computational power that are able to communicate and to coordinate among themselves for reaching a common goal.

```

>Set of entities (computers, machines, software), Distributed (spatially separated, independent), Common Goal: Communication, Coordination, resource sharing.

Example:
- World wide web
- Clusters, network of workstations
- DIstributed manufactoring systems
- Network of branch office computers
- P2P networks (BitTorrent)

We have several computers performing the same task and the goal is the fault-tolerant agreement. So, the first problem is the:

**Failures**
All computer systems fail (sooner or later). It is a good design practice to build a robust systems. We have different types of failures:
- Failure detection (Checksum detect a corrupted packet)
- Failure masking (message retransmission)
- Failure tolerance (intruion tolerance system)
- Failure recovery

>Failure are uncertain!

When programs need to cooperate they coordinate their actions by exchanging messages. Close coordination often depends on a shared idea of the time at which events occurs. There are limits to the accuracy with which computers on a network can synchronie their clocks:
- Network delays are not constants
- Clock drift cannot be know in a precise way

