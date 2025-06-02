

## Network Sniffing
Capturing packets from the network transmitted by others' nodes and reading the data content in search of sensitive information (e.g., passwords, session tokens).  

- **Tools**: Network sniffers/protocol analyzers like Ettercap, bettercap, NetworkMiner, driftnet, dsniff, macof, etc. (non-exhaustive list).  
- **Analysis**: Protocol decoding and stream reassembly of collected data.  
- **Passive Mode**: Packets are captured, copied, and passed to user level for analysis without active interference.  
- **Requirements**: Attacker must be on the same network path or broadcasting domain.

## Realize network sniffing
The network interface must operate in promiscuous mode for sniffing. The sniffer must be positioned along the network path or at minimum within the same network segment. In non-switched LANs (using hubs), this represents the ideal scenario since hubs duplicate every frame to all ports. In switched LAN environments, attackers must bypass switch segmentation through techniques like flooding the switch with excessive frames (MAC flooding) to overwhelm its CAM table, or executing ARP spoofing attacks to redirect traffic between ports - which enables potential Man-in-the-Middle attacks. For wireless LANs, sniffing becomes feasible either when no encryption is implemented or when weak encryption (like WEP) is used, effectively reducing the scenario to equivalent hub-based LAN conditions.

## Breaking the switch segmentation mechanism
- _Bridges_ were the initial solution for reducing collisions and segmenting networks:
    - Feature two ports connecting network segments
    - Only forward frames destined for the opposite segment (filtering)
    - Operate in "store & forward" mode - reading and regenerating frames only when necessary
- _Switches_ evolved as multiport bridges:
    - Precisely regenerate frames only to the destination segment
    - Dynamically learn host locations in real-time

## MAC Address/CAM Table Review
The Content Addressable Memory (CAM) table is a critical switching component that stores MAC addresses along with their associated physical ports and VLAN parameters. These tables have a fixed size limitation. As network traffic flows through the switch, the CAM table dynamically learns device locations by recording the source MAC address of incoming frames and associating them with the specific ingress port. When the switch encounters an unknown MAC address, it employs a flooding behavior, replicating the frame across all ports within the relevant VLAN to ensure delivery.

**CAM Overview**
This theoretical attack became practical in May 1999 with the release of the 'macof' tool, originally developed by Ian Viteck in about 100 lines of Perl code. Dug Song later ported it to C for inclusion in the 'dsniff' suite. The attack exploits the fixed size limitation of CAM tables in network switches. Most switches use hash algorithms to organize MAC addresses into the CAM table, similar to hashed lists with limited-capacity buckets. When multiple MAC addresses hash to the same value, the system uses multiple buckets (n) for storage. If all corresponding buckets become full, the switch reverts to flooding behavior for new unknown MAC addresses, effectively bypassing the segmentation benefits of switching.

# ARP spoofing
An ARP request message should be placed in a frame and broadcast to all computers on the network. Each computer receives the request and examines the IP address
The computer mentioned in the request sends a response; all other computers process and discard the request without sending a response

![[2Semester/PND/images PND/151.png]]

**HOW IT WORK**
Host A has the IP address of host B
It knows it is in the same network has to use→ Ethernet
It needs to know the MAC address of host B
It broadcasts an ARP request for IP of host B (MAC Dest = `ff:ff:ff:ff:ff:ff`)

![[2Semester/PND/images PND/152.png]]

Host B sends back an ARP- reply
The ARP reply has the MAC address of B as source and MAC address of A as destination
(It was in the original ARP-request). Then Host a can finally send the IP packet.

![[2Semester/PND/images PND/153.png]]

## ARP Table
Dynamic table that holds the IP-MAC pairings
- It is accessed before sending any Ethernet frame
- It starts empty and is filled as the MAC addresses are collected
- Unused MAC addresses are removed after a timeout (address ageing) in the order of minutes
- According to RFC 826 (ARP), when receiving an ARP reply, the
- IP-MAC pairing is updated (age and pairing...)

## Gratuitous ARP responses
Gratuitous ARP is used by hosts to “announce” their IP address to the local network and avoid duplicate IP addresses on the network. Routers and other network hardware may use cache information gained from gratuitous ARP responses. Gratuitous ARP is a broadcast packet (like an ARP-request).

![[154.png]]

## Misuse of Gratuitous ARP
ARP has no security or ownership of IP or MAC addresses
- Host W broadcasts I’m 1.2.3.1 with MAC 12:34:56:78:9A:BC
-  Wait 5 seconds, and then host W broadcasts I’m 1.2.3.1 with MAC 12:34:56:78:9A:BC
- Repeat...
What happens?

![[2Semester/PND/images PND/155.png]]

Host X and Y will likely ignore the message unless they currently have an ARP table entry for 1.2.3.1

When host Y requests the MAC of 1.2.3.1 the real router will reply and communications will work until host W sends a gratuitous ARP again. Even a static ARP entry for 1.2.3.1 on Y will get overwritten by the Gratuitous ARP on some OSs.

## Hijacking in the local network
Through ARP spoofing, an attacker can impersonate any network entity - whether it's another host, the default gateway, DNS servers, or other critical infrastructure. At its most basic level, this technique enables denial-of-service attacks by disrupting legitimate network communications. More significantly, it facilitates sophisticated man-in-the-middle (MITM) attacks where the attacker intercepts traffic, potentially reroutes it to harvest responses, and can then forward those responses while simultaneously sniffing, forging, or altering the data in transit. This raises important security questions about protocols like SSH and SSL - while these encrypted protocols provide protection against content inspection, the initial traffic redirection through ARP spoofing can still enable certain attack vectors before encryption takes effect.

# Man in the Middle
![[2Semester/PND/images PND/156.png]]
![[2Semester/PND/images PND/157.png]]
