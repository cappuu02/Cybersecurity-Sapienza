# Mirai Botnet Attack
In August 2016, the **Mirai Botnet** targeted **Dyn**, a major provider of **DNS infrastructure**, disrupting large portions of the internet.
- The attackers **exploited vulnerable IoT devices** (e.g., cameras, DVRs) by scanning for systems with:
    - Open ports
    - Default factory settings
    - Preinstalled usernames and passwords

Once infected, these devices became part of the botnet, allowing attackers to **remotely control them** and launch a massive **DDoS attack**
- The attack generated **1.2 terabits per second** of traffic.
- Major websites like **Twitter, Reddit, Netflix, and Airbnb** went down across **North America and Europe**.
- It remains one of the **largest DDoS attacks in history**.

#### **Related IoT Security Failures**
In **2017**, researchers discovered critical vulnerabilities in:
1. **Implanted medical devices** (pacemakers, defibrillators by St. Jude Medical):
    - No authentication, allowing attackers to:
        - Extract patient data
        - Drain batteries by flooding devices with messages
2. **Owlet baby monitors** (a Wi-Fi-connected sock sensor):    
    - No authentication in the interface, enabling attackers to:
        - Disrupt Wi-Fi connections
        - Disable critical alerts

# Jeep Cherokees hack
In 2016, Charlie Miller and Chris Valasek, had discovered and exploited a
replicable security vulnerability in Jeep Cherokees
- The hack impacted 1.4 million vehicles and required a product recall
- YouTube video
- Paper: Miller, Charlie, and Chris Valasek. "Remote exploitation of an unaltered passenger vehicle." Black Hat USA 2015.S 91 (2015): 1-91.

Scanned the Sprint network and found thousands of exposed vehicles
online.
- Allowed them to connect to the Uconnect (an in-vehicle connectivity platform) head unit, where they found a remote code execution vulnerability, which let them run arbitrary commands
- .From there, they were able to pivot into the vehicle’s internal network — the CAN (Controller Area Network) bus — which controls vehicle functions.
- Once there, they could send messages to Electronic Control Units (ECUs) that controlling steering, breaking, transmission, speed

# IoT environments
Tens of billions of devices are now connected to the internet, with **smart objects** becoming increasingly **ubiquitous**. These technologies enable critical applications in:

- Smart cities
- Smart homes
- Healthcare
- Surveillance
- And more

Many of these services require users to **share personal (and sometimes private) data** in exchange for **personalized or advanced functionality**. As a result, **security and privacy must be a top priority** in IoT design.

## **The Security Gap in IoT Devices**
Despite growing reliance on IoT, **many commercial products suffer from weak or poorly designed security mechanisms**. Key issues include:

1. **Manufacturer Background**
    - Many IoT vendors originate from **low-cost sensor/actuator markets** (e.g., home automation, lighting, surveillance).
    - Devices were often **designed for isolated systems**, where security was not a primary concern.
2. **User Awareness & Practices**
    - Users frequently **lack security education**.
    - Many fail to implement **basic protections**, such as changing **default passwords**.
3. **Systemic Vulnerabilities**
    - Inadequate authentication/encryption.
    - Lack of secure update mechanisms.
    - Exposure to remote exploits due to poor network configurations.

# Vulnerabilities of the Thing Layer
==Node capturing==: An attacker can steal or replace a node in a IoT system with a malicious one.

==Malicious code injecting==: An attacker can inject some malicious code in the memory of the node. Firmware and software updates are done on the air.
If the process is not encrypted an attacker can intercept the communication and inject malicious firmware.

==False Data Injection Attack==: The attacker may use a malicious node to inject erroneous data onto the IoT system. This may lead to false results and may result in malfunctioning of IoT applications.

==Eavesdropping and Interference==
• IoT nodes are often deployed in open environments,
easily exposed to eavesdropping. The attackers may
eavesdrop and capture the data during transmission
and/or authentication.

==Sleep Deprivation Attacks==
• The attacker tries to drain the battery of the low-
powered IoT devices. This leads to a denial of service
from the nodes in the IoT application

# Vulnerabilities of the Network Layer
==DoS/DDoS attacks==
- The attacker floods the target servers with a large number of unwanted requests. This incapacitates the target server, thereby disrupting services to genuine users.
- IoT applications are very susceptible to Distributed DoS attacks, if an attacker is able to control many IoT devices

==Routing attacks==
- Malicious nodes try to redirect the routing paths during data transfer.
- Sinkhole attack: the adversary advertises a better routing path and attracts nodes to route traffic through it.
- Warm-hole attack: An attacker can create a warm-hole (out of band connection) between a compromised node and a device, bypassing the basic security protocols.

# Vulnerabilities of the middleware and gateway layers

==Man-in-the-Middle Attack==
The MQTT protocol uses a publish-subscribe model of communication between clients and subscribers using the MQTT broker. If the attacker can control the broker and become a man-in-the-middle, then he/she can get complete control of all communication without any knowledge of the clients.

==End-to-end encryption==
- To ensure the confidentiality of the data, the IoT application should not let anyone other than the unique recipient to decrypt the encrypted messages.
- To perform protocol translation, gateways are required to decrypt and re-encrypt the messages.
- Data becomes susceptible to breaches.

# Security measures/vulnerabilities/ attacks of popular IoT Protocols 8.1 Zigbee

## ZigBee recap
PHY and MAC layer taken from IEEE 802.15.4 standard.
The NWK provides functionalities such as routing, security, and configuration of new devices, managed by the network coordinator that also acts as trust center.

The trust center is responsible for
1) authenticating the devices that require to join the network;
2) deciding whether to accept or deny the join request;
3) maintaining and distributing network keys;
4) enabling end-to-end security between devices

![[2Semester/PND/images PND/196.png]]

## Cryptographic keys
The cryptographic routines used in ZigBee employ two 128 bit keys:
- link key, used to secure unicast communications between the application and the device.
- network key is needed for broadcast communications: it is shared among the same network.
Vendors also provide device-specific keys called master keys

## Key acquisition
There are different ways for a device to acquire the required link or
network key:
- ==Preinstallation==: The link or network key is installed in the device during the manufacturing process
- ==Key Transport==: The link or network key is generated elsewhere (usually by the Trust Center) and then communicated to the device. (Often sent unencrypted over-the-air)
- ==Key Establishment==: Uses asymmetric cryptography (public/private key pairs) to establish a shared secret that both devices can compute independently, which can then be used as a Link Key.

>Uses a protocol based on Elliptic Curve Diffie-Hellman.

## ZigBee Network Key Sniffing Attack
The attack can be as easy as follows:
![[2Semester/PND/images PND/197.png]]

## Sinkhole attack
Sinkhole attack: very common attack in Wireless Sensor Networks.
A compromised node in the network starts spreading false information
about his routing capabilities, pretending to have a really good route to the Base Station. All other nodes in the network will start forwarding packets directed to the Base Station through the malicious node.
The attacker can drop or simply modify data inside packets and then forward them to the coordinator, making it difficult to detect the attack

```ad-example
![[82k.png]]


```

… because ZigBee supports two possible topologies: hierarchical trees and mesh networks.
In hierarchical trees, the routing is fixed. But in mesh networks, ZigBees uses a weighted AODV routing protocol where link weights are defined as follows:
$$C(l) = min(7, [\frac{1}{p^4_l}])$$
where $p_l$ is the probability of successful packet delivery over link $l$.
This is not specified by the ZigBee Alliance, but by individual developers and vendors. A reasonable way to define $p_l$ is to make it grow with the transmission power of the devices connected to $l$.

```ad-example
![[83k.png]]

```


# Security measures/vulnerabilities/ attacks of popular IoT Protocols 8.2 BLE
Central and peripheral nodes. Peripheral broadcast advertisements,
central listens to the advertisements of the devices it
wants to interact with, and they connect.

BLE operated in the unlicensed 2.4 GHz ISM band and
uses 40 channels with a 2 MHz spacing.
The BLE MAC layer is split into two parts:
- advertising, using 3 channels to broadcast device information and establish connections
- data transfer, using 37 of the available channels are used during the transmission of data.

In the data communication phase, data is normally sent in bursts to save energy. -> In this way, peripherals can remain in sleep mode for long periods, waking up periodically to listen to the channel for possible messages from the master. The central decides the rendezvous instants with the peripherals, according to a time division multiple access (TDMA) scheme with frequency hopping (different from CDMA, cos each device uses the channel with FH, but one at the time following TDMA).

## BLE addresses
BLE MAC address is hidden, whereas a random address which changes frequently is advertised. 
- BLE can choose one of three following types of random addresses:
- Random Static Address - Generate a random address per power cycle. The address cannot be regenerated at any other time.
- Resolvable Private Address (RPA) - Generate a random address within a given time interval. Generated using a Identity Resolving Key (IRK) and a random number.
- Trusted devices that know the random key can resolve it, and recover the real identity of the device.
- Non-resolvable Private Address - Randomly generated address with a given time interval.
- No device can resolve it and recover the true identity. Used to achieve full anonymity.

## BLE encryption and authentication
BLE encryption and authentication processes are based on AES with 128 bit keys. The
symmetric key for link is generated during the pairing procedure, which is executed as
follows.
1. Feature exchange. Clients and servers exchange IO capabilities, authentication
requirements, Long Term Keys (LTK) entropy proposal (KeySize, from 7 to 16 bytes -
negotiation) etc. None of this is encrypted.
2. Key establishment
- The devices generate or exchange a temporary key (TK) using one of the available
pairing methods (next slide).
- After that, a short term key (STK) is generated from the TK.
3. Key distribution phase
Using the STK-encrypted link, both devices send selected long-term keys, used to derive
session keys for future encrypted connections
4. Bonding phase
- Devices exchange and store common link keys (LTK) that can be reused when a link
between the two devices is re-established at a later time.

## Pairing methods in authentication - just works
![[84k.png]]

## Pairing methods in authentication -numeric comparison
![[85k.png]]

## Pairing methods in authentication - passkey
One of the two devices generates a k bit long secret
passkey.
- The user inserts it in the other device.
• Both devices:
• Generate a nonce and compute a commitment
value, which is function the nonce, the passkey
and the public keys.
• Exchange commitments and nonces.
• Each device recalculates the commitments as
before, but changing the order of the two public
keys and using the nonce of the other device.
• If the passkey is the same, the new commitment
value must match the one sent by the other device

![[86k.png]]

## Network traffic sniffing - fitness tracking case study (1)
Exploited vulnerability: frequent advertisement BLE packets and poor address management
- Listening to BLE traffic in a gym.
- BLE traffic traces collected for 8 consecutive days, with each trace being two hours in duration. 6 fitness trackers (servers), 1 IPhone, 1 Nexus (clients).

>$7.5$ million packets, $3.5$GB.

Most of the advertisement packets come from the servers (fit trackers),
while clients (iOS and Android mobiles) do not advertise continuously and change their address often. Why do fitness trackers advertise so
frequently?

![[87k.png]]

… Because the client device frequently disconnects the fitness trackers in order to reduce its own energy consumption.
- The fitness trackers are only connected to the smartphone when the corresponding smartphone application on the smartphone is running
- In this phase, the tracker actively communicates and synchronizes the activity data (e.g. steps, calories etc.).
- When the app is not running, the connection is terminated, leaving the fitness tracker in advertising state.
- This behaviour was observed in all six fitness trackers in the study

… We saw that BLE devices can change their addresses to prevent these
situations.
- Reality: none of the trackers did that.
- Most used static addresses and a few resolvable private addresses. Both kinds did not even change after complete battery discharge.
- This makes it easy to be used to activity detection.
- The tracking vulnerability stays.

> An attacker can sniff the BLE traffic and track the users as they move around in public places.

==Activity detection==
- The tracking vulnerability can be exploited to perform additional inference in a person’s activity.
-  Observation: the amount of BLE data traffic between the Fitbit and the smartphone is proportional to the (motion) intensity of user’s activity.

![[88k.png]]


People identification.
- Fit trackers use accelerometers to get statistics like number of steps walked, total calories burnt, total distance covered, flights of stairs climbed.
- BLE data exhibits different patterns when different users are walking

![[89k.png]]

- People identification.
- Fit trackers use accelerometers to get statistics like number of steps walked, total calories burnt, total distance covered, flights of stairs climbed.
- BLE data exhibits different patterns when different users are walking

![[90k.png]]

## KNOB attack
Exploited Vulnerability: unencrypted feature exchanges.
An attacker can downgrade the entropy of any BLE LTK and session key to 7 bytes (Key Negotiation of BLE - KNOB) through a Man-in-the-Middle (MitM) attack
- 7 byte keys can be brute-forced.

![[91k.png]]
![[92k.png]]

# Security measures/vulnerabilities/ attacks of popular IoT Protocols 8.2 LoRaWAN

## Eavesdropping LoRa
Eavesdropping attacks occur when a hacker intercepts, deletes, or
modifies data that is transmitted between two devices. Recall that LoRa uses AES-CTR as encryption scheme.

![[93k.png]]

AppSKey is the key used for end-to-end encryption and the counter is the frame counter in LoRa’s MAC frame, not really a nonce.

What is the problem with using the same key stream multiple times?
![[94k.png]]

What is the problem with using the same key stream multiple times?
The XOR of the two cipher texts is equal to the XOR of the plain texts

![[95k.png]]

Since LoRa uses AppSKey as a key, the counter must be always different
in order to obtain a different stream key. This is not the case, as LoRa uses the frame counter as a counter, which is reset to 0 after a transmission session. This means that the same key stream is used multiple times.

Why is it dangerous?
- The XOR of the plain text still does not reveal the original messages. Nevertheless, an attacker may know or guess part of the plain text.
- For instance, if LoRa is used by a temperature sensor, the attacker might guess that part of the original massage is “temperature: “
- Crib-dragging: guess possible words and XOR those against the XORedd cipher text to possibly reveal parts of the original message.