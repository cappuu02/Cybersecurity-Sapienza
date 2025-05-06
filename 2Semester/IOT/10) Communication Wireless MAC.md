
```ad-warning
Appuntare parte prima!

```

---
# Sensor MAC (S-MAC) (1)
Sensor-MAC (S-MAC) protocol is an energy efficient protocol specifically designed for WSNs. Sensor network scenario:
- most communication occurs between nodes as peers, rather than to a single base station.
- Suitable for applications that are latency-tolerant.
- Main goal: improve energy efficiency while maintaining good scalability and collision avoidance.

# Sensor MAC (S-MAC) - frame
Periodic listen and sleep mechanism to establish a low-duty-cycle operation on each node.
- Frame: complete cycle of listen and sleep periods.
-  Frame begins with a Listen period, further divided into smaller intervals for sending or receiving SYNC, RTS, CTS packets.

![[25z.png]]
# Sensor MAC (S-MAC) - neighbour coordination
All nodes are free to choose their own listen and sleep schedules.
-  To reduce control overhead, however, neighboring nodes coordinate their sleep schedules and try to adopt the same schedules, rather than randomly sleep on their own.
- To establish coordinated or synchronized sleep schedules, each node exchanges its schedule with all its immediate neighbours by periodically broadcasting a SYNC packet.

# Sensor MAC (S-MAC) - collision avoidance
![[1K.png]]

# Traffic Adaptive Medium Access (TRAMA) (1)
TRAMA employs a traffic adaptive distributed election scheme to decide transmission schedules. TRAMA consists of three components:
- **Neighbour Protocol (NP)**.
- **Schedule Exchange Protocol (SEP)**.

>allow nodes to exchange two-hop neighbour information and their schedules

Adaptive Election Algorithm (AEA), which uses neighbourhood and
schedule information to select the transmitters and receivers for the
current time time.

**TRAMA** assumes a single, time-slotted channel for both data and signaling transmissions.
![[2k.png]]
Each node transmits by selecting a slot randomly
- Nodes can access the network during this period
- All nodes must be in transmitting or listening mode
- Nodes share neighbourhood information
- Nodes share schedules for transmission slots
- Time syncronization

Nodes share information with the` ==node protocol NP==:
- Signaling packets carry incremental 1-hop neighbour updates.
- If no updates, signaling packets are sent as “keep-alive” beacons.
- A node times out a neighbour if it does not hear from it for a certain amount of time.
- knowing 1-hop neighbours of a node’s neighbours allows 2- hop neighbourhood knowledge.
-  Nodes share schedule messages containing their traffic needs (who they wants to talk to, and when).
- Nodes listen to their neighbours' schedules and build a conflict-free schedule using a priority function
- Conflicts (multiple nodes wanting the same slot) are resolved using the Adaptive Election Algorithm

> Se conosco il vicino del vicino conosco due hop!

# Adaptive Election Algorithm - TRAMA
Each transmission slot can be used by only one node in a two-hop neighbourhood to avoid interferences. The priority of a node for a given time slots is computed as an hash function that is public and deterministic.

All nodes compute the same priority values for their 2-hop neighbours, so they all agree on who has the highest priority for a given slot. Only nodes that have data packets to send are eligible for having a time slot allocated. The node with the highest priority wins the slot and gets to transmit. Other nodes go to sleep or prepare to receive if they are the intended receiver.

# Association and neighbour discovery in IEEE 802.11 (WiFi)

## Neighbour discovery in Wired Networks: Link-Layer Discovery Protocol (LLDP) (1)
LLDP is protocol used by network devices for advertising their identity,
capabilities, and neighbours on a local area network connected through
Ethernet. Periodically (e.g., every 30 seconds) switches/routers exchange LLDP
messages with their physical neighbours. similar to hello messages, used for “introducing” themselves, contain records as chassis ID, system name, system description etc. 

>Common Cisco-Proprietary variant: Cisco Discovery protocol (CDP)

![[3k.png]]

>When we run LLDP, switches exchange LLDPUs with personal info.

```ad-example
Example: switches provided with ethernet/fiber ports (Eth/fa/Gi), forward packets at high speed. Can log into them and configure them.

```

**Can LLDP be used to discover neighbours in wireless networks?**
Wireless has additional challenges
- may have equivalent access points
- may need to discover “closest” neighbours
- neighbours may lie about who they are
Wireless protocols have been developed to solve these challenges:
- association, discovery, authentication

# Scanning
**Active Scanning**
NIC sends probe request frames and waits for probe responses from APs

**Passive Scanning**
listens for beacon frames from nearby APs.

>Access points periodically (default 100ms) send beacons with personal information (supported rates, transmission parameters) and what SSID they support (e.g., eduroam)

**What AP to choose?** 
.Select it manually, or the ones with highest SNR

## AP Association process
![[4k.png]]
