# Chapter2

## Scanning
- Determining if the system is alive 
- Determining which services are running or listening 
- Detecting the operating system 
- Processing and storing scan data

## Determinating if the system is alive

### Network ping sweeps 
- ARP host discovery: on the same subnet 
	- **Arp-scan**: run as root by sudo to list IP-MAC 
	- **Nmap** (Network Mapper): host and service discovery with various options (host only: -PR –sn) 
	- **Cain** (Windows-only): beyond host and service discovery

#### Address Resolution Protocol (ARP)

```ad-example
![[ETH/Images/1.png]]

```

#### Nmap
`Nmap –sn –PR –send-IP <IP-range>`
Is the easiest way to pinging. 
NMAP not only sends an ICMP ECHO REQUEST packet it also performs an ARP ping, some TCP pinging. Understanding what tools do, is really important. If the target network is being monitored by an IDS, you may inadvertently trigger an alert because of all of the extra traffic being generated.

>`-Pn` option probes only port 22, `-sn` to probe ports, `-Pe` skip ARP resolution


### ICMP host discovery: remote host/router
- ICMP ECHO REQUEST, ICMP ECHO REPLY, ICMP TIMESTAMP, ICMP ADDRESS MASK, etc. 
- Ping: OS utilities for ECHO REQUEST/REPLY 
- Nmap: ICMP ping/address mask/timestamp, ARP ping, TCP ping 
- Hping3 and nping: any combinations of flags on any combinations of packet types, spoofing MAC/IP 
- Superscan: multiple ICMP in parallel

![[ETH/Images/2.png]]
![[ETH/Images/3.png]]

### TCP/UDP host discovery
TCP/UDP host discovery: when internal and/or external ICMP is not permitted
- **Servers**: TCP/UDP service ports 
- **Desktops**: local firewall to ban inbound connections, but accessible through remote desktop, file sharing, and disabled local firewall 
- **Nmap/Superscan/Nping**: all ports (slow and noisy) or specific ports 

## Ping Sweeps Countermeasures
==Detection== 
- IDS: snort 
- Commercial firewall: network or desktop 
	- Detect ICMP, TCP, UDP ping sweeps 
		- A pattern of ICMP/TCP/UDP packets from a particular system or network 
- Host based tools: Scanlogd, courtney, ippl, protolog 
- Not just tools, eyeballs count. 

==Prevention== 
- ACL in firewall: limit ICMP traffic into your networks or systems 
- Allow only ECHO_REPLY, HOST UNREACHABLE, TIME EXCEEDED into specific hosts in DMZ; allow only ISP’s specific IP addresses
	- Loki2: hackers use it to backdoor the OS and tunnel data in ICMP ECHO 
	- Pingd: move ICMP from kernel to user spaceCRE

## 3-way handshake
![[ETH/Images/4.png]]


## TCP Header
![[ETH/Images/5.png]]

with flag:
![[ETH/Images/6.png]]

## Determining Which Services Are Running or Listening
Port scanning:
- Identifying TCP/UDP services running on the target 
- Identifying type of OS of the target 
- Identifying applications or versions of a service – Scan types (anomalous TCP packets) 
	- TCP connect scan (3-way handshake) 
	- TCP SYN scan (half-open scan, SYN then SYN/ACK or RST/ACK) (not traceable) 
	- TCP FIN scan (RST if closed port) 
	- TCP Xmas Tree scan (FIN/URG/PUSH) 
	- TCP null scan, TCP ACK scan 
	- TCP Windows scan 
	- TCP RPC scan 
	- UDP scan (ICMP port unreachable msg, if closed port)

## Determining Which Services Are Running or Listening
![[2Semester/ETH/Images/37.png]]


## Detecting The Operating System
Useful info for vulnerability mapping 
- Banner grabbing: some applications tell it all 
- FTP, telnet, SMTP, HTTP, POP, and other 
- Scanning available ports: some services are OS specific! 
- Stack fingerprinting: TCP/IP stack implementation

Making guess from available ports 
- Windows: ports 135, 139, 445 (139 only for Windows 95/98); 3389 for RDP (Remote Desktop Protocol) 
- UNIX: TCP 22 (SSH), TCP 111 (RPC portmapper=port 135), TCP 512-514 (Berkeley Remote services, rlogin), TCP 2049 (NFS, Network File System), high number ports 3277x (RPC, Remote Procedure Call in Solaris)

## Port 135, 139, 445
- ==Port 135== Microsoft EPMAP, end-point mapper. Microsoft relies upon DCE RPC to remotely manage services. Some services that use port 135 of end-point mapping are: DHCP server, DNS server, WINS server 
- ==Port 139== NetBIOS 
- ==Port 445== MS Server Message Block (SMB), SAMBA-compatible


Active stack fingerprinting (Phrack Magazine) 
- Vendors interpret RFCs differently when writing TCP/IP stack 
- Nmap `–O`: signature listing at Nmap-os-fingerprints 
	- FIN probe (Windows 7/200x/Vista respond with FIN/ACK) 
	- Bogus flag probe (Linux responds with the same undefined flag) 
	- Initial Sequence Number sampling (find pattern in the ISSN)
	- “Don’t fragment bit” monitoring (some OS have it set) 
	- TCP initial window size (tracked on returned packets) 
	- ACK value (same number sent +0 or +1) 
	- ICMP message quenching (RFC 1812 limit rate of error messages) 
	- ICMP message quoting (# of quoted info in errors) 
	- ICMP message echoing integrity (IP headers changed in ICMP errors) 
	- Type of service (TOS) (most implementation use 0, but can vary) 
	- fragmentation handling 
	- TCP options

![[ETH/Images/7.png]]

**Countermeasures**
- Detection 
	- They can detect scan with an option set (e.g. SYN) 
		- Use Snort, Scanlogd, ecc. 
	- Prevention 
		- Change unique stack characteristic (not recommended) 
		- secure proxy or firewall, Active Defence


## Detecting The Operating System Active Operating System Detection

Vulnerability mapping involves several techniques to identify potential security risks. One method is **banner grabbing**, where certain applications reveal critical information about their versions and configurations. Another approach is **scanning available ports**, as some services are OS-specific. For instance, Windows systems commonly use ports 135, 139, and 445 (with port 139 being exclusive to Windows 95/98), while Remote Desktop Protocol (RDP) runs on port 3389. On UNIX systems, notable ports include TCP 22 for SSH, TCP 111 for RPC portmapper (equivalent to Windows' port 135), TCP 512-514 for Berkeley remote services like rlogin, TCP 2049 for NFS (Network File System), and ports in the 3277x range for RPC, particularly in Solaris.

**Stack fingerprinting** is another key technique, where the TCP/IP stack implementation provides clues about the underlying OS. This process can involve active stack fingerprinting, as described in _Phrack Magazine_, highlighting how vendors interpret RFCs differently when writing TCP/IP stacks. The tool **Nmap** offers OS fingerprinting capabilities using the `-O` option, with signature listings available in the Nmap OS fingerprints database.

Several probing techniques assist in OS identification, such as the **FIN probe**, where Windows 7, 200x, and Vista respond with a FIN/ACK packet. Additional methods include the **bogus flag probe**, **initial sequence number sampling**, **“don’t fragment” bit monitoring**, **TCP initial window size analysis**, **ACK value adjustments (+0 or +1)**, and various ICMP-based tests, including message quenching, quoting, and echoing integrity. Other factors like TOS, fragmentation handling, and TCP options further contribute to OS detection.

To counter these reconnaissance techniques, detection and prevention mechanisms must be in place. Detection tools such as **Snort** and **Scanlogd** help identify scanning activities. Prevention strategies include using a **secure proxy or firewall** and implementing **active defense mechanisms** to mitigate unauthorized fingerprinting attempts.

## TCP/IP Stack Fingerprint
The TCP/IP fields that may vary include the following: 
- Initial packet size (16 bits) 
- Initial TTL (8 bits) 
- Window size (16 bits) 
- Max segment size (16 bits) 
- Window scaling value (8 bits) 
- "don't fragment" flag (1 bit) 
- "sackOK" flag (1 bit) 
- "nop" flag (1 bit) 

These values may be combined to form a 67-bit signature, or fingerprint, for the target machine. Just automatically checking the Initial TTL and window size fields is often enough in order to successfully identify an operating system

## TCP/IP Stack Fingerprint
The TCP/IP fields that may vary include the following: 
- Initial packet size (16 bits) 
- Initial TTL (8 bits) 
- Window size (16 bits) 
- Max segment size (16 bits) 
- Window scaling value (8 bits) 
- "don't fragment" flag (1 bit) 
- "sackOK" flag (1 bit) 
- "nop" flag (1 bit) 

These values may be combined to form a 67-bit signature, or fingerprint, for the target machine. Just automatically checking the Initial TTL and window size fields is often enough in order to successfully identify an operating system.

## Detecting The Operating System Passive Operating System Detection

- To be stealthy to IDS: passive 
- Passive stack fingerprinting 
	- At a central location or a port with packet capture (by port mirroring) 
	- Siphon: a passive port-mapping, OS identification, and network topology tool 
		- Passive signatures in osprints.conf 
			- TCP/IP session: TTL, window size, DF (Don’t Fragment), etc. –
	- Tend to fail if: (1) applications build their own packets, (2) not able to capture packets, (3) a remote host changes the connection attributes (active detection also fails on this) 
- Countermeasures 
	- Same as OS detection countermeasures

![[ETH/Images/8.png]]
![[ETH/Images/9.png]]

## Processing and Storing Scan Data
Efficiency in managing scan data $\to$ speed to compromise a large number of systems 
Metasploit: A vast platform of tools, payload, and exploits 
- PostgreSQL for database 
- db_connect: tells metasploit how to connect to database and which database to use `msf > db connect postgres:<password>@localhost: <port>/msf3 `
- db_nmap (root required): run Nmap scans • Metasploit could scan but slower than Nmap
- db_import: import Nmap results into database, commands: 
	- hosts: show hosts and their OS 
	- services: show all available ports and services 
	- Filtering (-s) to see, e.g., all hosts with SSH or running Windows 2008 

![[ETH/Images/10.png]]
![[ETH/Images/11.png]]
![[ETH/Images/12.png]]
![[ETH/Images/13.png]]
