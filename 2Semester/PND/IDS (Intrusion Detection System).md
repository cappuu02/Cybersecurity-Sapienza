## Intrusion detection/prevention systems
An Intrusion Detection System (IDS) aims at detecting the presence of
intruders before serious damage is done.

The ultimate purpose of an intruder could be to:
- Prevent the legitimate users from using the system
- Reveal confidential information
- Use the system as a stepping stone to attack other systems

Second generation IDS are IPS, Intrusion Prevention Systems, also produce responses to suspicious activity, for example, by modifying firewall rules or blocking switches ports

Deep packet inspection (payload)
IDS: report intrusions by out of band detection
IPS: Block intrusions by in band filtering

![[206a.png]]

>Network detection system inside our network (outside does not make any sense).

## IDS vs IPS
![[207a.png]]

IDS : Inspect the traffic without any interaction
IDS is passive: detects and raises alarms
IPS: is considered like one steps that traffic as to take to go to the destination
IPS is active: detects and reacts.

Typically IPS is placed in-line, able to actively prevent/block intrusions in real time. However, functionalities of both have blurred: NIST (National Institute of Standards and Technology) uses the term IDP

## Beware to the alarms
Alarms can be raised (positive)
or not (negative)
IDS needs to detect a substantial Alarm percentage of intrusions with raised few false alarms
If too few intrusions detected → no security
If too many false alarms → ignore

![[208a.png]]


## Other functionalities
Recording information related to observed events.
Notifying (alert) security administrators of important observed events.
Producing reports

>Reports summarize the monitored events or provide details on particular events of interest.

In case of IPS also changing the network activity

>Drop connections, block accesses, change configurations of other devices,
change of the content of packets (normalization of the requests) and so on

## IDS/IPS block diagram
![[209a.png]]

## IDS/IPS Function Blocks
![[210a.png]]


## Types of IDS
- ==Host-based (HIDS)==:
	- Monitors events in a single host to detect suspicious activity.
	- Typically deployed on critical hosts offering public services
	- Advantage: better visibility into behavior of individual applications running on the host
	- Se un server ha sempre un comportamento specifico e, ad un certo punto, inizia a comportarsi in modo strano, questo nuovo comportamento risultato anomalo viene rilevato!
- ==Network-based (NIDS)==:
	- Analyses network, transport and application protocol activity
	- Often placed behind a router or firewall that is the entrance of a critical asset
	- Advantage: single NIDS/IPS can protect many hosts and detect global patterns
- ==Wireless (WIDS)==:
	- Analyses wireless networking protocol activity (not T- or A-layers)
	- Typically deployed in or near an organization’s wireless network

### HIDS (Host-based)
Only monitors traffic on one specific system (no promiscuous mode)
It looks for unusual events or patterns that may indicate problems:
- Unauthorized access and activity
- Unexpected activity
- Changes in configurations
- Software changes

### NIDS (Network-based)
Usually operates in promiscuous mode → sniffers (Can have multiple NICs to monitor multiple network segments).

Usually connected to switches with ports mirrored (or in SPAN mode, Switch Port ANalizer): All the traffic generated within ALL the ports of the switches are replicated on the mirrored port where the NIDS is placed.

Often it has a series of sensors placed in different networks (DMZ, internal net, specific nodes...). Distributed detection system.

## Other types of IDS
- File integrity monitors (e.g. Tripwire, AFICK)
	- Monitor changes to key system configuration files
- Flow-based IDS (NetFlow)
- Tracks network connections
	- Establishes patterns of normal traffic
	- Alert when unusual services/patterns/protocols/behaviors seen
	- Can give a good overall situational view on large network(s)
- Hybrid detection capabilities
	- Augment or replace signature-based detection
	- Usually anomaly/behavior-based (pseudo-artificial intelligence)
	- Often require “training” periods to establish a baseline

## Activities Monitored by IDS/IPS (1-2)
Any activity sensitive to occurrences of any events deemed to be security concerns
Attempted and successful breach
- Reconnaissance
- Patterns of specific commands in application sessions
	- e.g., a successful remote login session should contain authentication commands
	- Login and location frequency
- Content types with different fields of application protocols
	- e.g., the password for an application must be 7-bit ASCII of 8 to 64 allowed characters to avoid buffer overflow and SQL injection
- Network packet patterns between protected servers and the outside world
	- Client application, protocol and port, volume, and duration
	- Rate and burst length distributions for traffic
- Privilege escalation



- Attacks by legitimate users/insiders Malware:
	- Illegitimate use of root privileges–Rootkits/Trojans/Spyware
	- Unauthorized access to resources and data–Viruses, zombie and worms
	- Command and program execution–Scripts hard to handle mutations
		- Mouse, keyboard, CPU, disks, I/O patterns
		- Programs/system calls/processes execution frequencies, resource access (exhaustion), denied executions
		- File/database access activity
		- Read/write/create/delete frequency; records read/written; failed reads, writes, creates, deletes; resource exhaustion

- Denial of service attacks
	- Rate and burst length distributions for all types of traffic

- Malware
	- rootkits/trojans/syware
	- Viruses, zombie and worms
	- Sripts
	- Hard to hadle mutations
		- Polynomic and metamorphic viruses: each copy has a different body

## IDS Approaches
![[211a.png]]

## How to recognize an intrusion
Behavior-based (anomaly detection):
- Define behavioral characteristics of normal behavior
- Compare actual behavior with these. If there are significant differences, raise an alarm
- Difficult to define all possible normal behavior. New activities often give “false positives” (i.e. normal behavior classified as intrusion)
Signature based (misuse detection):
- Define characteristics of various types of abnormal activities
- Compare actual behavior with these. If any of them match, raise alarm!
- Difficult to produce a complete catalog of abnormal activities.
	- If any are missing, there will be “false negatives” (i.e. undetected intrusions)

## Learn and classify anomalies
Behavior is typically described in terms of a set of features
The feature set should describe all relevant aspects of the behavior to be recognized
Anomaly detection requires some form of learning (or ”training”), usually based on data mining in actual observations
A too large feature set means that both training and classification will take unnecessarily long time
- Require more observations in order to deal with more features

```ad-example
![[212a.png]]
```

## Other feature sets
Particular technologies need their own feature sets, e.g.:
Wireless networks:
- Signal power
- Sequence number ”jumps”
- Round-trip time (RTT)

Grid/cloud systems:
- GridFTP connections
- GridFTP mode of operation
- Number of GridFTP clients (evidence of ”Flash crowds”)
- Traffic entropy
- Type of LDAP operations

## Behavior-based IDS
Intruders may behave in a different manner from ordinary users or ordinary
programs:
- Many types of attack are characterized by abnormal patterns of OS use or network use.
Recognizing abnormal behavior enables us to detect attacks as they take place.
Big questions:
- How to recognize normal and abnormal behavior patterns?
- How quickly can recognition take place?
- How do we deal with abnormally behaving systems?

## Adaptive and self-learning profile
Adaptive profiles can account for normal network changes to avoid raising false alarms Self-learning is critical to ensure wide and successful deployment of anomaly-based detection mechanisms

Need to apply anomaly-based detection at various levels of traffic aggregation to achieve the most accurate protection

Manually set the profiles is difficult because of the complexity of dynamically changing traffic statistics. A single server, a server farm, a business division, an enterprise

## Signature-based IDS
Starts from the idea that intruders/attacks may have a characteristic appearance which makes it possible to identify them The idea is to screen the PAYLOADS of the packets looking for specific patterns → signatures

Suppliers of IDSs maintain huge databases of signatures (code or data fragments) which characterize various classes of intruder. Rapid recognition involves searching for matches for one or more of the known signatures from a collection of many thousands of signatures.

![[213a.png]]

### Signature-based IDS principles
A packet sniffer “on steroids”.
Captures the packets in a LAN and applies some fairly complex logic to decide whether an intrusion has taken place

SNORT is one of the best known intrusion detectors
- Easy-to-learn and easy-to-use rule language for intrusion detection.
- The rules are stored in /etc/snort/rules directory
- Con: can not inspect encrypted traffic (VPNs, SSL)
- Con: not all attacks arrive from the network
- Con: record and process huge amount of traffic


## IDS detection capability
Decode packets, namely DPI: deep packet inspection
Decode application and protocol headers to look at high-layer activity → the payload containing the application protocol.
Protocol decoding to detect anomalies

## Misuse detection
 METTERE

## Extract misuse signatures
Use invariant characteristics of known attacks
- Bodies of known viruses and worms, port numbers of applications with known buffer overflows, RET addresses of stack overflow exploits
- Hard to handle malware mutations
	- Metamorphic viruses: each copy has a different body
- Challenge: fast, automatic extraction of signatures of new attacks
- Honeypots are useful for signature extraction

>Try to attract malicious activity, be an early target


## Honeypot
A security resource whose value lies in it being attacked, probed or compromised
Ahoneypot is (usually) a single computer, whereas
A honeynet is a network of computers, usually protected by a firewall to regulate traffic.
The idea is to attract the attackers

### Example of IDS rule evasion
METTERE

## TCP Attacks on NIDS
![[214A.png]]

## Behavior-based detection techniques: protocol anomaly
mettere

## Behavior-based detection techniques: statistical anomaly


## Signature vs. Behavior

## Combine behavior and signature

## Combined Behavior and Signature Detection

## IDS vs. IPS

## IDS architecture
Usually several parts:
- Network sensors: detect and send data to the system
- Central monitoring system: a server that processes and analyzes data sent from sensors
- Database and storage component: repository for event information

## IDS COmponents
![[215a.png]]


## Host IDS/IPS
Many host security products have integrated HIPS, anti-malware and firewall
- Protects mobile hosts from attack when attached outside the protected network
- Protects against local attacks from a user, and codes/scripts from removable devices
- Protects against attacks from the same subnet/VLAN
- Protects against encrypted attacks where the encrypted data stream terminates at the host being protected
- Inspect packet content after decrypting received VPN or SSL packets
- Inspect packet together with anti-malware software by decrypting or emulating malware
Con: if an attacker takes over a host, then one can tamper with IDS/agent binaries and modify audit logs
Con: only local view of the attack
Con: Host-based anomaly detection has high false alarm rate

## Host IDS/IPS evolved in EDR
EDR: Endpoint Detection and Response
Integrated toolkit of software (HIPS, anti-malware, firewall...) that continuously
monitors a device to detect and respond to cyber threats
- Inspect packet content after decrypting received VPN or SSL packets
 - Inspect packet together with anti-malware software by decrypting or emulating malware
- Inspect any resource used by the endpoint (user accounts, changes to ASP keys, executables and administrative tool usage, process executions, process-level network activity, including DNS requests, connections, and open ports, archive file creation, removable media usage, and so on)
- Exploits threat detection/response capabilities of the vendor's global threat intelligence database, which is further enhanced with machine learning capabilities

>Example: Microsoft Defender Advanced Threat Protection (ATP) which is powered by the Microsoft Cloud