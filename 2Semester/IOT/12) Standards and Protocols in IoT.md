```ad-abstract
title: Definition

A protocol is a set of rules and procedures that define how devices
communicate in a network. A standard is an agreed-upon framework or a set of guidelines established by a governing body to ensure interoperability between different systems and
vendors. 
```


>Protocols and standards can operate on different layers

![[28k.png]]

## Radio spectrum regulation
Radio spectrum is regulated by countries and/or organisations, such as
the International Telecommunication Union (ITU) and the Federal
Communications Commission (FCC).

They ==regulate== how portions of the spectrum are allocated to different
types of telecommunications such as radio, television, military, etc.
In IoT access technologies, the frequency bands leveraged by wireless
communication are either licensed or unlicensed bands.

## Licensed Bands
Licensed bands communication infrastructures are deployed by service
providers and public services. Users must subscribe to services when connecting their IoT devices (subscription fee).

```ad-failure
title: Disadvantage
This adds more complexity to a deployment involving large numbers of sensors and other IoT devices.

```

```ad-success
title: Advantage
The network operator can guarantee the exclusivity of the frequency usage over the target area (lack of congestion, minimal interference).

```

>Licensed bands are used in cellular networks, satellite communication, emergency services, FM/AM radio and TV.

## Unlicensed Bands
The ==ITU== has also defined unlicensed spectrum for the industrial, scientific, and medical (ISM) portions of the radio bands (ISM bands).
Mostly used in communication technologies for short-range devices (SRDs). Unlicensed does not mean unregulated. Regulations exist, mandating devices on parameters such as transmit power,
duty cycle, channel bandwidth…

```ad-success
title: Advantage
Simpler deployment than licensed (does not require a service provider).

```

```ad-failure
title: Disadvantage

Can suffer from more interference because other devices may be competing for the same frequency in a specific area.
```

Some protocols within the ISM bands operate in the sub-GHz range (below the Ghz)

```ad-success
title: Advantage
- Sub-GHz frequency bands allow greater distances between devices.
- These bands have a better ability than the 2.4 GHz ISM band to penetrate building infrastructures or go around obstacles.

```

```ad-failure
title: Disadvantage
Lower rate of data delivery compared to higher frequencies.

```

**Didn’t we say that unlicensed bands are for short range communication?** 
Sub-ghz bands allow for longer distances, but sending low power signals that degradate early, allows to create multiple small networks with very little interference

# Layer 1 and 2 Protocols, IEEE 802.15.4
```ad-abstract
title: Definition

IEEE 802.15.4 is a wireless technology for low-cost, low-data-rate devices that are battery-powered, whose batteries may need to last months
```

- Deployed in WSNs and MANETs, and in the network range of WPAN.
- Defines low-data-rate PHY and MAC layer specifications
- The IEEE 802.15.4 PHY and MAC layers are the foundation for several networking protocol stacks.

![[29k.png]]

## ZigBee
ZigBee solutions are aimed at smart objects with low bandwidth and low
power needs. ZigBee-compliant products can interoperate even though different vendors might manufacture them.
- 400 companies are members of the ZigBee Alliance, an industry group to certify interoperability between vendors.
- Mostly used in industrial automation (measuring temperature and humidity, tracking assets) and home applications (lighting thermostats and security control).

### ZigBee stack
![[30k.png]]

- PHY and MAC layers use IEEE 802.15.4 standard.
- Network and security layer provides mechanisms for network startup, configuration, routing and securing communication.
- Hierarchical addressing
- Ad hoc On Demand Distance Vector Routing
- Uses 802.15.4 for security at the MAC layer

### 802.15.4 PHY 
The original IEEE 802.15.4 standard specified three PHY options:
- 2.4 GHz, up to 16 channels with data rate of 250 Kbps (global)
- 902–928 MHz, 10 channels with data rate of 40 Kbps (North and South America)
- 868.0–868.6 MHz, 1 channel with data rate of 20 Kbps (Europe, Middle East and Africa)

>Latest version (IEEE 802.15.4-2020) uses dozens of different frequency bands, optimised for regions and applications, allowing more flexibility.

The first release was based on **Direct-Sequence Spread Spectrum**. 
The latest version supports many different modulation schemes (QPSK, BPSK, ASK, OOK), supports a mix of contention-based and contention-free methods, depending on the MAC mode.

#### 802.15.4 PHY Frame
Synchronisation Header (5 bytes):
- Preamble: identifies the start of the frame and is used to synchronise data transmission (4 bytes).
- Start of Frame Delimiter: informs the receiver that frame contents start immediately after this byte (1 byte).
- PHY Header contains the frame length in number of bytes (1 byte).
- PSDU (PHY Service Data Unit) is the payload (0-127 Bytes).

![[31k.png]]

#### 802.15.4 MAC
The ==802.15.4 MAC== layer **manages access to the PHY channel** by defining how
devices share the frequencies allocated. This MAC layer perform these task:
- Network beaconing for devices acting as coordinators
- PAN association and disassociation by a device.
- Reliable link communications between two peers MAC entities.

**MAC Frame Types**
- Data frame: handles all transfer of data
-  Beacon frame: used for beaconing by a PAN coordinator
-  Acknowledgement frame: confirms the successful reception of a frame
- MAC command frame: controls communication between devices

>MAC frame is carried as the PHY payload 

![[32k.png]]

Can be broken into:
- MAC Payload, variable length depending on frame type.
- The MAC footer is a frame check sequence used by the receiver to check integrity.

IEEE 802.15.4 requires all devices to support a unique 64-bit extended MAC address (assigned by the vendor).
- Because the maximum MAC frame length is 127 bytes, the standard also defines how a 16-bit “short address” is assigned to devices by the coordinator.
-  The short address is local to the PAN and substantially reduces the frame overhead.

#### 802.15.4 Topologies
IEEE 802.15.4 supports networks with:
- star
- tree 
- mesh topologies.

Every 802.15.4 PAN should be set up with a unique ID, shared among
nodes in the same network. Two types of devices:
- Full Function Devices - at least one acting as the coordinator, delivering services.
- Reduced Function Devices

![[33k.png]]


### Security
The IEEE 802.15.4 specification uses Advanced Encryption Standard (AES)
with a 128 bit key length as the base encryption algorithm to secure its data.
802.15.4 validates sent data by a message integrity code (MIC), calculated from the entire frame using the same AES key. Enabling these features changes the frame format, consuming more payload.

![[34k.png]]

### Advanced Encryption Standard
128-bit symmetric block cipher
- AES arranges the 128 bite message in a 4x4 state matrix (each entry is one byte).
- Key Schedule: uses a 128-bit key to generate 11 round keys are derived (1 for each of 10 rounds + initial one) using a key expansion algorithm.
- AddRoundKey: XOR the state matrix with the first round key. Then run for 10 rounds these operations:

![[35k.png]]


# 6.1 Layer 1 and 2 Protocols, IEEE 802.11ah
IEEE 802.11 is the WiFi standard, the most successful wireless technology for unconstrained networks.  It is a key wireless access technology:
-  Can connect endpoints such as computing nodes, high data rate sensors, audio/video analytics devices
-  WiFi backhaul infrastructures include also WiFi mesh in smart cities.

## IEEE 802.11 Version
![[36k.png]]

## 802.11ah (WiFi HaLow)
**Traditional WiFi**
designed for providing high throughput for small- scale networks with a few dozen nodes and a coverage of tens of meters.

**IEEE 802.11ah (2017)**
Is the first Wi-Fi solution optimised for IoT applications. It supports sub-GHz frequency bands for better signal penetration (up to 1km transmission range), low power for battery-powered nodes, and the ability to support a large number of devices.

## 802.11ah PHY 
Operates in unlicensed sub-GHz bands, varying from Country to Country.
Uses Orthogonal Frequency Division Multiplexing (OFDM) modulation.
-  OFDM is a frequency-division multiplexing (FDM) scheme.
- In FDM, signals are non overlapping.
- In OFDM, signals overlap, but with peak of one signal being at the zero of other signals (orthogonality).
-  Improved bandwidth usage

![[37k.png|400]]

Uses channels of 1, 2, 4, 8, or 16 MHz band-width and different frequency bands depending
on the country. Supports spatial multiplexing (MIMO) to create multiple streams (rarely used in practice).

![[38k.png]]

## 802.11ah MAC 
![[39k.png]]

**Null Data Packet (NDP) Support:**
- Can send frames with no payload.
- Relevant information is concentrated in the PHY header and the additional overhead associated with decoding the MAC header and data payload is avoided.
- This change makes the control frame exchanges efficient and less power consuming for the receiving stations.

**Short Beacons:**
- In addition to full beacons
- Short beacons are sent more frequently when there are not changes in the network and at the lowest rate. Used for stay synchronisation and keep alive.
- Full beacons are sent less frequently.

**Restricted Access Window (RAW) Mechanism:**
An Access Point (AP) sends beacons to announce the presence of a wireless LAN and to provide a timing signal for synchronizing communications with connected devices. Each AP can support up to 8192 devices, though this high density may lead to frequent collisions when multiple stations attempt to communicate with the AP simultaneously.

To manage medium access, the AP allocates specific time slots called Restricted Access Windows (RAW) during the beacon interval. These RAW periods are further divided into smaller time slots. The RAW mechanism combines Time Division Multiple Access (TDMA) and Carrier Sense Multiple Access with Collision Avoidance (CSMA/CA), organizing stations into groups and restricting channel access to only those stations assigned to a particular group.

In dense networks, IEEE 802.11ah enhances efficiency by implementing two-level grouping to reduce contention. The AP dynamically manages RAW groups based on device behavior, spatial location, Quality of Service (QoS) requirements, and energy efficiency considerations.

![[40k.png]]

**Target Wake Time (TWT)**
Reduces energy consumption by permitting an access point to define times when a device
can access the network.
- This allows devices to enter a low-power state until their TWT arrives.
- It reduces the probability of collisions in areas with many clients.
- Used for stations transmitting data sporadically

**Group sectorization:**
Consists in dividing different areas into into sectors (spatial division), each containing a subset of stations, aiming to mitigate hidden node problem, contention or interference.
It is particularly effective when the AP has multiple directional antennas

**Hierarchical Organization:**
The AP assigns an AID (Association ID) to a station during association handshake. AID is 213
bits long (8192). The AP supports Hierarchical Organization of AIDs.
Stations are organised in P pages of B blocks each. Each block contains 8 sub-blocks of 8 stations each. Stations with similar characteristics are grouped together to reduce overheads while referring to them.

# Layer 1 and 2 Protocols, LoRaWAN

## LPWA
In recent years, a new set of wireless technologies known as Low-Power Wide-Area (LPWA) has received a lot of attention from the industry. Particularly well adapted for long-range and battery-powered endpoints. LoRaWAN (Long-Range Wide-Area Network) is an unlicensed band LPWA technology. NB-IoT (Narrow-Band IoT) and LTE are LPWA-based licensed band protocols using cellular networks.

## LoRaWAN standardisation
LoRa was initially developed as a physical layer (PHY) modulation technology by Cycleo, a French company later acquired by Semtech. Designed for long-range, two-way communication with low power consumption, the technology expanded beyond Layer 1 with the formation of the LoRa Alliance, which broadened its scope into a complete ecosystem.

Semtech’s LoRa, which remains the foundational Layer 1 PHY modulation, is now available through multiple chipset vendors. The term "LoRaWAN" refers to the full architecture and specifications, encompassing end-to-end communication protocols that define how LoRaWAN networks operate.

![[41k.png]]

## LoRa PHY
LoRa PHY operates across various unlicensed frequency bands, which vary by region. For example, Australia uses the 915–928 MHz band, South Korea operates within 920–923 MHz, and Japan utilizes 920–928 MHz.

The network follows a star topology, where a LoRa gateway acts as the central hub. These gateways are equipped with multiple transceivers, enabling them to demodulate several channels simultaneously—or even separate signals on the same channel. Their primary function is to relay data between endpoints, all of which are just a single hop away from the gateway.

For larger-scale deployments, a **"star of stars"** topology can be implemented, where multiple LoRa gateways interconnect to extend coverage and improve network capacity.

![[42k.png|300]]

The data rate in LoRaWAN is not fixed but varies based on regional frequency bands and **Adaptive Data Rate (ADR)**. The ADR algorithm dynamically adjusts the data rate and transmission power for each endpoint to optimize network performance, ensuring efficient and scalable communication.

Endpoints located near gateways, where signal strength is strong, transmit at **higher data rates**. This results in **shorter transmission times** and **lower power consumption**. Conversely, devices at the edge of coverage—where the signal is weak—operate at the **lowest data rate** and **highest transmit power** to maintain reliable connectivity.

By balancing these factors, ADR maximizes both energy efficiency and network capacity, adapting in real time to changing conditions.

## LoRa PHY - CSS
LoRa uses Chirp Spread Spectrum (CSS) as a modulation scheme.
The signal is encoded using chirps — signals whose frequency increases (up- chirp) or decreases (down-chirp) linearly over time. Each chirp is one symbol.
We can encode data in chirps by changing the chirp’s timing (offset or delay of the chirp within a fixed time frame), phase or sweep direction. It is a spread spectrum technique (the entire bandwidth is used for representing each symbol).

![[43k.png]]

In LoRa, the spreading factor has 6 possible values: SF7, SF8,…, SF12.
- A SFn, means $2^n$ different symbols: higher SF (higher bits per symbol) -> more symbols.
- But we have seen that higher SF means lower data rate! While modulation schemes with more bits per symbol allow more data rate (with powerful enough signals)!
-  In other modulation schemes that we have seen (ASK, PSK, FSK etc), the symbol duration (i.e., how long it takes to transmit a symbol) was the same for all symbols.
- In CSS it is not! Instead, the duration of chirp increases exponentially with SF!
- To distinguish more symbols (higher SF), the chirp must sweep more finely across frequency to detect smaller differences in phases and frequencies.
- That requires more time (the longer you observe a signal, the better you can resolve small frequency differences). In fact:

![[44k.png]]

LoRaWAN's Adaptive Data Rate (ADR) dynamically adjusts the spreading factor based on each device's distance from the gateway. Devices using lower spreading factors achieve faster transmission speeds but over shorter distances, making them ideal for locations near the gateway. Conversely, higher spreading factors enable more reliable long-range communication at slower data rates, suitable for edge-of-network devices. For optimal performance, ADR should be enabled for fixed endpoints to automatically optimize settings, while mobile endpoints perform better with a fixed spreading factor to avoid constant adjustments from signal variations.

## LoRaWAN MAC
- LoRaWAN messages have a PHY payload composed of a 1-byte MAC header, a variable-length MAC payload, and a 4 byte Message Integrity Code (MIC). 
- The MAC payload size depends on the frequency band and the data rate.

- LoRaWAN endpoints are uniquely addressable through a variety of methods, including:
- An endpoint can have a global end device ID (DevEUI)
- An endpoint can have a global application ID (AppEUI) that uniquely identifies the application provider, such as the owner of the end device
- 32 bit device address, DevAddr, The 7 most significant bits are the network identifier (NwkID), which identifies the LoRaWAN network. The 25 least significant bits are used as the network address (NwkAddr) to identify the endpoint in the network.

## LoRaWAN topology
The infrastructure consists of endpoints exchanging packets through gateways acting as bridges, with a central LoRaWAN network server. Gateways connect to the backend network using standard IP connections, and endpoints communicate directly with one or more gateways.

![[45k.png]]

## LoRaWAN security (1)
LoRaWAN implements two essential security layers for robust protection. The **network security layer** (MAC level) authenticates devices and encrypts control messages using AES with a shared **NwkSKey**, ensuring integrity via cryptographic checks. The **application layer** separately encrypts payload data end-to-end using a dynamically generated **AppSKey**. Both keys derive from a unique root **AppKey** per session, preventing key reuse. This dual-layer approach isolates and secures network operations and user data independently.  

*(Concise, 100% non-bulleted, covering: authentication, dual encryption, session keys, forward secrecy, and defense-in-depth principle.)*

![[46k.png|400]]

## AES Counter mode (AES-CTR)

LoRaWAN employs **AES-CMAC** to generate a **Message Integrity Code (MIC)** for verifying data authenticity and integrity. The process works as follows:

First, two subkeys (**K1** and **K2**) are derived from the **NwkSKey (K)**. The message (MAC header + payload) is split into **128-bit blocks (Mi)**, with padding applied if needed.

An internal state variable **Xi** (initialized to zero) updates iteratively: for each block **Mi**, it computes **Xi = AES-Encrypt(K, Xi-1 XOR Mi)**. The final block is adjusted by XORing with either **K1** (if no padding) or **K2** (if padded).

The result is a **128-bit CMAC tag**, with the **first 4 bytes** forming the **MIC**—appended to the frame to confirm message integrity. This ensures that transmitted data remains tamper-proof and authentic.

![[47k.png]]

LoRaWAN employs **AES in counter mode (AES-CTR)** to securely encrypt data between devices and the application server. Rather than directly encrypting the plaintext, the system generates a **128-bit keystream** by applying AES encryption to a dynamically incremented counter (nonce). This keystream is then XORed with the plaintext to produce ciphertext.

For messages exceeding 128 bits, the counter increments sequentially (counter+1, counter+2, etc.), with AES reapplied for each new block to extend the keystream. The **frame counter** from the MAC payload serves as the initial counter value, ensuring synchronization between endpoints. This approach combines efficiency with strong security, as the same key never encrypts identical counter values twice.

# Layer 1 and 2 Protocols, Bluetooth Low Energy

## BLE architecture and stack
The functionality of the Bluetooth LE protocol stack is divided between three main layers:
- Controller
- Host
- Application

![[48k.png]]

BLE transmits in the 2.4 GHz radio spectrum.
The frequency band is divided into 40 channels, three of which are used for advertising, while the others are for data transmission. The link layer describes how
different devices share the channel to communicate. Its operation can be described as a state machine with 5 possible states.

![[49k.png]]

The ==host controller interface== (HCI) layer is is a standard protocol that transports commands and events between the host and controller elements. L2CAP offers segmentation and
reassembly services for large packets.

The ==attribute== protocol defines how data is represented in a BLE server database and the methods by which that data can be read or written.

The ==GATT== layer is used by the application for data communication between two connected devices

The ==GAP== determines how two Bluetooth units discover and establish a connection with each other.

## Roles in BLE
There are many different roles that BLE devices can have, depending on
how they interact during communication. Different types of roles exist at different layers (can be a little confusing).

### BLE Link Layer
The **Link Layer State Machine** in Bluetooth Low Energy (BLE) governs the operational modes for device communication.

- **Standby State**: The device remains inactive, neither transmitting nor receiving packets.
- **Advertising State**: The device broadcasts packets on dedicated advertising channels (37, 38, 39) and listens for responses, acting as an **advertiser**.
- **Scanning State**: The device passively listens for advertising packets without initiating connections, functioning as a **scanner**.
- **Initiating State**: The device actively scans for advertisements from specific targets and responds to establish a connection, acting as an **initiator**.

These states enable flexible, low-power interactions for various BLE applications.

**Connected State**
Once a connection is established, the devices transition to the **Connected State**. Within this state, two roles are defined:

- **Central Role**: Assigned to the device that initiated the connection (previously in the **Initiating State**).
- **Peripheral Role**: Assigned to the device that accepted the connection (previously in the **Advertising State**).

In the connected state, the **central device** manages communication timing using **Time-Division Multiple Access (TDMA)**, coordinating transmissions with the **peripheral device**.

![[50k.png]]

The applications running on top of the BLE device are responsible for deciding its role, based on their functional needs, power constraints, or communication intent. The protocol responsible for defining and controlling these roles is: ==GAP==. Generic Access Profile, controls connections and advertising in BLE. Defines communication modes and roles. BLE supports two different communication modes:
- Connection-oriented communication
- Broadcast communication


## GAP - communication modes
- ==Connection oriented communication==: when there is a dedicated connection (link) between devices, forming a bi-directional communication (central and peripheral roles).
- ==Broadcast communication==: when devices communicate without establishing a connection and by broadcasting data packets to all devices within its range. Unidirectional communication. Example:

![[51k.png]]

## Broadcast topology
A broadcaster that advertises data. Observers scan and read data from the advertisement packets sent by the broadcaster. No limit in how many devices one can broadcast to (anyone in the range). More power efficient than communication oriented communication. Less throughput, because of limited data available in the advertisement packets. No ACKS.

![[52k.png|300]]

## Connection-oriented topology
![[53k.png]]
Establishes a bidirectional connection before data transfer occurs.
Increased throughput by establishing a direct link before communication.

## Mesh (multi-role) Topology
A device can operate in multiple different roles simultaneously, i.e., it can act as a peripheral in one setting and a central in another. Often used in systems where a device acts as a hub and receives sensor data from multiple sensors and at the same time wants to forward this data to other devices.

![[54k.png]]

## ATT & GATT: Data representation and exchange
The just seen GAP layer defines communication modes (connection- oriented/broadcast oriented) and roles (peripheral and central/broadcaster and observer) and is responsible for the advertising phase.

In connection-oriented communication mode, after the bi-directional communication is established, the Attribute protocol (ATT) and the Generic Attribute Profile (GATT) layers define how data is represented and exchanged between BLE devices.

The ATT and GATT layers are concerned with the phase after a connection has been established, as opposed to the GAP layer which takes care of the advertisement process which occurs before a connection is established.

### ATT Protocol 
The ==ATT protocol== is used to **discover, read and write attributes on a peer device**.
Based on a **client-server architecture** where the server holds the data and
can either send it directly to the client or the client can poll the data from the server.

The client and server roles defined in this layer are assigned independently
from the peripheral and central roles defined in the GAP layer. Nevertheless, usually a peripheral is the server since it is the one acquiring data and holding it, and the central is usually the client. These roles are decided by the GATT layer.

Most of the times, the mobile phone (central) acts as client, reading data advertised by the sensor (peripheral - server). Sometimes, the mobile phone acts as a server and the sensor as a client, as in the picture, which requests a firmware update to the mobile.

![[55k.png]]

#### ATT Protocol - Attributes
Attributes is a ==standardised data representation format==. Attributes are composed of four fields:
- **Type**, defined by a Universally Unique Identifier (UUID), 128-bit value.
- **Handle**, unique unsigned 16-bit identifier that is used by the client to reference an attribute on the server. It makes the attribute “addressable,” and it does not change during a single connection.
-  **Permissions**, defines the level of access control for a resource (read/ write/notify).
- **Value**, the attribute data.

#### ATT Protocol - operations
ATT protocol defines six methods by which attributes can be read or written. They define different Protocol Data Units (PDU), i.e., different packets to be encapsulated and sent over the physical link. 

- Request: sent to a server by a client to perform an operation (i.e., clients need to read a value).
- Response: sent to a client in response to a request.
- Command: sent to a server by a client (does not require acknowledgement).
- Indication: unsolicited PDUs sent to a client by a server, used when the server needs to sent critical data reliably.
- Confirmation: PDUs sent to confirm receipt of an indication by a client.
- Notification: unsolicited PDUs sent to a client by a server for frequent, low-latency updates (do not require acknowledgement).

## GATT Layer
The generic Attribute Profile layer sits on top of the ATT layer and provides a logical hierarchical classification of attributes using:
- profiles,
-  services,
- characteristics.
It uses these concepts to govern the data transfer between BLE devices.

### GATT Layer - Profiles, Services and Characteristics
A ==profile== is a pre-defined collection of Services.
Profiles foster interoperability across products from different vendors. To adhere to a profile, software must offer a predefined set of capabilities. List of officially adopted GATT-based profiles

==Services== are used to break data up into logical entities and contain specific
chunks of data, the characteristics. can have one or more characteristics,
has a unique UUID. List of BLE Services

==Characteristics== are the lowest concept in GATT. They encapsulate single data point and include properties like read, write, notify, etc.

```ad-example
![[56k.png]]

```

![[57k.png]]

# Layer 3 Protocols

## Advantages of IP in IoT
The Internet protocol (IP) has been around for over 35 years!
![[58k.png]]

## Disadvantages of IP in IoT
![[59k.png]]
Last mile communication (i.e., communication between sensors, embedded systems, IoT gateway, etc) has very different features than Internet communication.
Bidirectional versus unidirectional data flow. Some devices essentially only send data and reports. Overhead for last-mile communication.
`IPv4 header ≥ 20 bytes`
`IPv6 header = 40 bytes`
`UDP header = 8 bytes`
`TCP header ≥ 20 bytes.`
If the data to be forwarded by a device is infrequent and only a few bytes long, you can potentially have more header overhead than device data Network diversity. Some devices support vendor-specific protocols and are not compatible with other protocols/devices.

## IoT Devices
IoT encompasses a wide range of devices with varying capabilities:

1. **Highly Constrained Devices**
    - Minimal resources, often transmitting only small amounts of data infrequently.
    - Limited security and management functionalities.
    
2. **PC-like Devices with Network Constraints**
    - Comparable computing and power resources to conventional PCs.
    - Restricted networking capabilities (e.g., limited bandwidth).
    - Typically run a full IP stack, though network designs must account for bandwidth limitations.

## Optimising IP for IoT
IoT data travels through the Internet for:
- Remote monitoring and controlling (e.g., data is sent to mobile phones through cellular communication).
- Cloud analytics and storage.
- Integration with external services.
- Firmware updates/configuration.

The Internet Protocol is key for a successful Internet of Things, but constrained nodes and networks mandate optimisation at various layers and on multiple protocols of the IP architecture. Optimisation can be achieved by adding an adaptation layer in the TCP/IP stack

![[60k.png]]

# Layer 3 Protocols, 6LoWPAN
6LoWPAN (IPv6 over Low-Power Wireless Personal Area Networks) is an open standard defined in RFC 6282 by the Internet Engineering Task Force (IETF), originally conceived to support IEEE 802.15.4 low-power wireless networks in the 2.4-GHz band. It is now being adapted and used over a variety of other networking media including Sub-GHz low-power RF. It allows transmission of IP packets in low-power wireless networks. Works at the adaptation layer.

![[61k.png]]

The optimisation and adaptation carried out with 6LoWPAN is achieved thanks to **header compression, fragmentation, and mesh addressing**. Such operations create separated headers stacked in the adaptation layer. Depending on the implementation, all, none, or any combination of these capabilities and their corresponding headers can be enabled.
6LoWPAN only works for IPv6, does not support IPV4.

![[62k.png]]

# IPv6
IPv6 is the latest version of the Internet Protocol and is designed to replace IPv4, offering a much larger address space.
- IPv6 ==header== is $40$ byte long.
- ==Version==. Always $6 = 0110$.
- ==Traffic Class==. Indicates class or priority of the IPv6 packet.
- ==Flow Label==. Used by a source to label the packets belonging to the same flow in order to request special handling by intermediate IPv6 routers. “0” is used for no specific flow.
- ==Payload Length==. Indicates the total size of the payload
- ==Next header==. Usually specifies the transport layer protocol in the datagram’s payload (UDP/TCP). When extension headers (EH) are present in the packet, this field indicates which EH follows.
-  ==Hop Limits==. Replaces TTL in IPv4.
- ==Source and Destination IPv6 addresses==.
- ==Extension headers.== Located between the IPv6 header and the transport layer header and contain IPv6 options. 
	- Many IPv6 extension headers are not examined or processed by any router along a packet's delivery path until the packet arrives at its final destination (more efficient/faster forwarding). Include fragmentation, authentication, destination, hop-by-hop options, and others
- ==IPv6 packet header== removes the following entries from IPv4:
- ==Header checksum==, which is replicated in MAC header, no needed in IP.
- ==Fragment offset==. IPv4 routers can fragment a data packet they have to forward if the packet is larger than the next hop's Maximum Transmission Unit (MTU). The fragments are reassembled by the receiving host.
	- In IPv6, routers do not support fragmentation, which is carried out only by end devices that determine the MTU through Path MTU Discovery before sending packets.
	- Path MTU Discovery is a standardized technique for determining the maximum transmission unit (MTU) size of the path between two IP hosts.
- ==Options== in IPv4 are replaced by pointer to next header extension

>A flow is a stream of packets that need consistent treatment (e.g., video stream). A flow is characterised by source and destination, protocol, port. Using traffic IDs allows to make traffic engineering more efficient.

![[63k.png]]![[64k.png]]

## IPv6 Addressing 
IPv6 addresses are 128 bit long, arranged in eight groups written in hexadecimal, each of which is 16 bits (IPv4 addresses are 32 bit long).
`example: 3FFE:085B:1F1F:0000:0000:0000:00A9:1234`

There are three IPv6 address types:
- ==Unicast== (one to one communication between two specific endpoints).
- ==Anycast== (a single IP address is shared by devices in multiple locations. Routers direct packets addressed to the destination whose location is nearest the sender).
	- Examples: DNS servers, Content delivery networks.
- ==Multicast== (data transmission is addressed to a group of destination computers simultaneously)

An IPv6 network interface has multiple addresses:
- ==Link local address==: Contains the interface identifier (computed from the MAC address). Can be used to reach the neighbouring nodes attached to the same link (1- hop distant, mostly used for neighbour discovery, router discovery, and local communication).
- ==Site-local address==: Has similar properties as an IPv4 private address.
- ==Global address==: Used to route IP datagrams over the Internet.

![[Pasted image 20250506110110.png]]

**Why do we need a link-local address?**
IPv6 introduces significant changes to network communication by replacing ARP (Address Resolution Protocol) with the more advanced Neighbor Discovery Protocol (NDP). This new protocol operates at Layer 3 using ICMPv6 rather than relying on Ethernet at Layer 2.

ICMPv6 expands significantly on IPv4's ICMP capabilities. While IPv4's ICMP primarily handles error reporting (like destination unreachable messages) and diagnostic tools (such as ping), ICMPv6 incorporates additional critical functions. These include neighbor discovery, router discovery, prefix discovery, redirects, and duplicate address detection - all essential for IPv6's automatic configuration features.

The NDP performs MAC address resolution through ICMPv6 Neighbor Solicitation messages, which fundamentally depend on link-local addresses. These special addresses, confined to a single network segment, enable devices to communicate for network configuration and maintenance before they obtain global addresses. This design allows IPv6 nodes to perform essential network operations independently of external address assignment mechanisms.

## 6LoWPAN networks
The 6LoWPAN network is connected to the IPv6 network using an edge router.
The edge router handles:
1) Data exchange between 6LoWPAN devices and the Internet (or other IPv6 network).
2) Local data exchange between devices inside the 6LoWPAN.
3) Generation and maintenance of the 6LoWPAN network.
By communicating natively with IP, 6LoWPAN networks are connected to other networks simply using IP routers. 6LoWPAN networks will typically operate on the edge, acting as stub networks (data going into the network is destined for one of the devices in the 6LoWPAN).

![[65k.png|500]]

## Adaptation Layer
The challenge of transmitting IPv6 packets over Low-Power and Lossy Networks (LLNs) like IEEE 802.15.4 becomes clear when examining the strict size constraints. In the worst-case scenario, the maximum 127-byte Physical Layer Service Data Unit (PSDU) must accommodate:

1. A standard 40-byte IPv6 header
2. An 8-byte UDP header
3. Approximately 25 bytes of MAC layer framing overhead (headers and footers)

This leaves only 54 bytes for actual payload - an unworkable limitation that demands protocol adaptation. The header overhead alone consumes about 73 bytes (57% of the total capacity), leaving minimal space for application data. This extreme inefficiency motivates the need for specialized adaptation layers and header compression techniques to make IPv6 viable for constrained networks while maintaining interoperability with standard IPv6 infrastructure.

## Header Compression
The way the headers can be compressed is one of the factors that led to 6LowPan only supporting IPv6 and not IPv4. 6LoWPAN header compression changes depending on the protocol release. At a high level:
- 6LoWPAN compression works by taking advantage of shared information known by all nodes from their participation in the local network (contexts, prefixes).
-  It omits some standard header fields by assuming commonly used values.
- Omits information that can be inferred from MAC headers

![[66k.png]]
![[67k.png]]
![[68k.png]]
![[69k.png]]
![[70k.png]]
![[71k.png]]
![[72k.png]]
![[73k.png]]
![[74k.png]]
![[75k.png]]
![[76k.png]]

## Routing
6LoWPAN has two routing modes, depending on what layer the routing mechanism is located:

- ==Mesh-under==.
	- Uses link layer addresses (IEEE 802.15.4 MAC) to forward data.
	- Mostly used in local networks where the only IP router is the edge router.
- ==Route-over==.
	- routing takes place at the IP level.
	- Used in larger and more powerful and scalable networks, where every router must implement all features supported by a normal IP router.

![[77k.png]]

6LoWPAN has two routing modes, depending on what layer the routing mechanism is located: Mesh Under. If mesh-under routing is performed, the Mesh Addressing Header is attached. Enables layer 2 multi-hop forwarding without requiring each node to reassemble and reprocess the IPv6 packet.

## RLP (at a very high level)
RLP (Routing Protocol for Low-power and Lossy Networks) is the most widely used routing protocol for route-over 6LoWPAN networks.
It is a Distance-Vector Routing protocol that creates a routing tree called Destination Oriented Directed Acyclic Graph (DODAG), typically rooted at the gateway or an edge router.

Each node in the network is assigned a rank that represents its “distance” from the root.

Ranks are assigned to nodes based on the Objective Function (OF) that the routing wants to optimise (e.g., number of hops `[MIN]`, energy consumption `[MIN]`, reliability - avoiding lossy links `[MAX]`, etc)

## Fragmentation
In order to enable the transmission of IPv6 frames over IEEE 802.15.4 links, the IPv6 frames might need to be divided into several smaller segments (fragmentation).

In fact, although 6LoWPAN header compression can spare many bytes, the payload of the frames is still very small in IEEE 802.15.4.

If fragmentation is performed, the fragmentation headers are generated to reassemble the packets in the correct order.

Remember: IPv6 routers do not perform fragmentation, which is completely handled at the source side.

## Fragmentation - routing modes
Intermediate nodes are not effected by IPv6 packets fragmentation. They perform link-layer packet forwarding.
- Intermediate nodes process packets at layer 3 (IP).
- When the IPv6 packet’s header is fragmented, it is split across multiple fragments.
- Fragments have to be reassembled at each hop before being processed.
	- Each intermediate node has to wait for all the fragments to reach, reassemble, inspect, and re-fragment them before routing them again (IPv6 is terminated at each node).
- The fragmentation header includes the Datagram Size, Datagram Tag, and Datagram Offset fields to identify the fragment, and be able to re-assemble the entire IPv6 packet.

# Application protocols

## Application layer protocols in IoT
Two most common application layer protocols in IoT:
- MQTT (Message Queuing Telemetry Transport) is a lightweight, publish-subscribe, machine-to-machine protocol for message queuing service. Designed for connecting servers with resource constrained, limited bandwidth devices (i.e., IoT devices). TCP-based
- CoAP (Constrained Application Protocol) UDB-based Internet application protocol designed for constrained devices that need to communicate over a constrained network (low-power, lossy networks)

## MQTT
MQTT employs a publish/subscribe model to separate message senders (publishers) from receivers (subscribers). A central broker manages all communication:

- The broker receives messages from publishers, filters them, and routes each message to the appropriate subscribers
    
- This architecture provides three key decoupling benefits:
    1. **Space decoupling**: Publishers and subscribers operate without knowledge of each other’s network details (IPs, ports)
    2. **Time decoupling**: Communication persists even when devices aren’t simultaneously active or connected
    3. **Sync decoupling**: Operations occur without blocking – publishers and subscribers interact asynchronously

The broker handles all routing logic, enabling scalable, resilient IoT messaging.

### MQTT components
An MQTT client is any device (from a server to a microcontroller) that runs a MQTT library. If a client is sending a message, it acts as a publisher, and if it receives a message, it acts as a subscriber (any device communicating with MQTT over a network is a MQTT client)

An MQTT broker is the backend system which coordinates messages between clients. Its roles include:
- receiving and filtering messages
- identifying clients subscribed to each message and sending them the messages
- authorising and authenticating MQTT clients
- Passing messages to other systems for further analysis.

MQTT clients and brokers begin communicating using an MQTT connection.
- Clients initiate the connection by sending a CONNECT message to the MQTT broker.
- The broker confirms that a connection has been established by responding with a CONNACK message.
- Clients never connect with each other, only with the broker.
- Brokers can be:
	- managed brokers, i.e., services that let the user use their hosted brokers in their servers for the user’s system.
- Self-Hosted brokers require the users to install the broker on their server with a static IP. Open source implementation of MQTT brokers include mosquito e hivem

## MQTT continue
Key feature of MQTT is MQTT topics. MQTT topics are keywords the MQTT broker uses to filter messages. It supports a stateful architectural approach, maintaining
persistent sessions. In IoT scenarios with unstable connectivity, MQTT allows clients to reconnect and resume communications without losing context.

![[78k.png]]

## MQTT control packets
The MQTT protocol uses distinct packet types for different operations, each with a consistent structure:

**CONNECT Packet**
- _Fixed Header_: Identifies the packet type as CONNECT
- _Variable Header_: Specifies protocol version, name, and connection flags (clean session, QoS, etc.)
- _Payload_: Contains client credentials (ID, username, password) and connection parameters

**PUBLISH Packet**
- _Fixed Header_: Marks the packet as a PUBLISH operation
- _Variable Header_: Includes the topic name and packet ID (for QoS tracking)
- _Payload_: Carries the actual message data (e.g., sensor readings like "31°C")

**SUBSCRIBE Packet**
- _Fixed Header_: Identifies the packet as a SUBSCRIBE request
- _Variable Header_: Holds a unique packet identifier
- _Payload_: Lists topics to subscribe to along with their requested QoS levels

This structure ensures efficient, standardized communication between MQTT clients and brokers.

## CoAP
CoAP (Constrained Application Protocol) follows a client-server model where clients request services and servers respond. Designed for efficiency, it features:  

**Resource-Oriented Architecture**  
- Each resource (data like images, text, or sensor readings) is identified by a URI  
- Uses RESTful principles, maintaining statelessness (each request contains all necessary information)  

**HTTP-like Methods**  
- *GET*: Retrieve a resource  
- *POST*: Create a resource  
- *PUT*: Update/create a specific resource  
- *DELETE*: Remove a resource  
- *OBSERVE* (GET extension): Receive real-time resource updates  

**Transport & Efficiency**  
- Runs over UDP for lightweight communication  
- Supports asynchronous messaging without acknowledgments to conserve energy in IoT devices  

This design makes CoAP ideal for resource-constrained networks while maintaining web-like functionality.

### CoAP - Message Format
- ==Version==: 2 bits. Represents version of CoAP protocol
- ==Type==: 2 bits for 4 types of messages
	- request: 0: confirmable (expects ACK)
	- 1: non-confirmable
	- response: 2: ACK, 3: RESET - could receive msg but could not process it (e.g., context is missing)
- ==Option Count==: 4 bits
- ==Code==: 8 bits. Indicates the method and whether the message is a request or a response.
- ==Message ID==: 16 bits
- ==Token==: variable size, ranges between 0 to 8 bytes. Each request carries a token. It is a client-local identifier to match requests and responses
- ==Options==: variable size, provide a flexible and compact way to include additional metadata or parameters in a message (as media type, lifetime of resources, etc)
- ==Payload==: variable size. It is typically a representation of the requested resource or the result of the requested action

![[79k.png|400]]
