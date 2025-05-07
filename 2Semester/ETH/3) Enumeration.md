
- Service fingerprinting
- Vulnerability scanners
- Basic banner grabbing
- Enumerating common network services

# Enumeration in Network Security

```ad-abstract
title: Enumeration Definition

==Enumeration== is an essential phase in penetration testing, involving the active extraction of information from a target system. Unlike scanning, which is more passive, enumeration establishes active connections to gather details such as user accounts, network resources, and service configurations. The process can be generic, like basic banner grabbing, or platform-specific, leveraging port scans and OS detection techniques.
```

One of the primary goals of enumeration is to retrieve user account names, discover misconfigured shared files, and identify outdated software versions that may have known vulnerabilities. Certain network services are particularly valuable for enumeration, including FTP (port 21), Telnet (port 23), and SMTP (port 25). By linking ports, services, and protocols to specific software, attackers can better understand a system’s configuration and potential weaknesses.

## Service Fingerprinting
Service fingerprinting helps determine the revision and patch level of software running on a target system. This can be done manually or automatically (Tools), balancing stealth and efficiency. Tools like Nmap use version scanning to match known service responses with specific protocols and versions. The `nmap-services` database maps ports to services, while `nmap-service-probe` identifies services based on their responses. Hidden services may use unexpected ports, such as Timbuktu using TCP port 1417 instead of a standard SSH port. `Amap` provides an alternative method for fingerprinting, using pattern-matching techniques to validate service versions.

```ad-example

An example of service fingerprinting with Nmap involves scanning a target on port 1417. A SYN scan (`nmap -sS target.com -p 1417`) might indicate that the port is open and associated with a specific service. A version scan (`nmap -sV target.com -p 1417`) provides additional details, such as whether it is running OpenSSH 3.7. Service detection ensures accurate results but may require manual verification.

![[ETH/Images/14.png]]

```


## Vulnerability Scanners
Vulnerability scanners operate by referencing databases of known exploits. Free options like `Nessus` and `OpenVAS` contrast with commercial solutions from vendors like McAfee, Qualys, and Tenable. Nessus, developed by Tenable, is widely used for exhaustive scanning and allows the use of custom plugins through its Nessus Attack Scripting Language (NASL). While initially open-source, Nessus became a proprietary tool after version 3.

Countermeasures against vulnerability scanning include conducting regular self-audits, maintaining effective patch management, and using intrusion detection systems (IDS) or intrusion prevention systems (IPS) to slow down automated scans. `Nessus` can be compared to `Nmap`, where Nessus focuses on deeper vulnerability scanning, while Nmap, with its Nmap Scripting Engine (NSE), is more versatile for general network discovery, version detection, and backdoor identification.

## Basic Banner Grabbing
Banner grabbing is a technique used to collect service banners that reveal software version information. This can be done manually using tools like Telnet (`telnet www.example.com 80`) or automatically with Netcat (`nc -nv target.com 80`). Banner grabbing helps identify potential vulnerabilities based on software versions but can be countered by restricting access to unnecessary services, implementing access control lists, and disabling software version details in banners.

![[ETH/Images/15.png|700]]
![[ETH/Images/16.png|700]]

## Enumerating Common Network Services
Several common network services provide valuable information for enumeration. 
==FTP (port 21)== is widely used for web content uploads but transmits passwords in cleartext, making it susceptible to interception. 
We can googling for FTP server, by searching: `Index of ftp://`. Here's the corresponding overly informative FTP banner:

![[ETH/Images/17.png]]

There are differents alternatives such:
-  SFTP (over SSH) 
- FTPS (over SSL)

 
 ==Telnet (port 23)== presents similar risks, allowing attackers to gather system and account information based on login error messages.  Telnet has banners, and allows bruteforce username enumeration:
- **System enumeration**: display a system banner prior to login: host’s OS and version, or vendor, explicitly or implicitly 
- **Account enumeration**: attempt login with a particular user and observe error messages
 
 >It sends passwords+data in cleartext
 
 Countermeasures for Telnet include replacing it with SSH, restricting access by IP address, and modifying system banners. (Don't Use Telnet)
 


==SMTP (port 25)== allows attackers to verify usernames through commands like VRFY and EXPN. Organizations can mitigate this risk by disabling these commands or restricting them to authenticated users.

>automatic tool `vrfy.pl `specify SMTP server and username to test

**Countermeasures**
Disable the EXPN and VRFY commands, or restrict them to authenticated users 
Sendmail and Exchange both allow that in modern versions

![[ETH/Images/18.png]]


==DNS (port 53 TCP)== can be exploited through zone transfers if misconfigured, revealing an organization’s internal structure. Attackers use tools like `dig` or `nslookup` to perform zone transfers, and defenses include restricting DNS queries and using separate internal and external DNS servers.

>Normally on UDP 53; TCP 53 for zone transfer

`nslookup, ls –d <domainname>; or dig`
`dig @10.219.100.1 version.bind txt chaos`

**DNS Cache Snooping**
![[ETH/Images/19.png]]

**Recursive DNS**
![[ETH/Images/20.png]]
![[ETH/Images/21.png|611]]

There are differents ==DNS enumeration tools== like:
- `dnsenum`
	- Google scraping
	- Brute forcing
	- Information Correlation
- `Web resources`

**Countermeasures**
Use separate internal and external DNS servers (do not expose internal targets) •
Block or restrict DNS zone transfers 
Restrict DNS queries to limit cache snooping


==TFTP (port 69)== is an inherently insecure protocol that lacks authentication, making it possible for attackers to retrieve files. Organizations should wrap TFTP within security layers like TCP Wrappers and restrict access to its root directory. 

**Countermeasure**
Wrap it to restrict access 
- Using a tool such as TCP Wrappers 
- TCP Wrappers is like a software firewall, only allowing certain clients to access a service
Limit access to the /tftpboot directory 
Make sure it's blocked at the border firewall


The ==Finger protocol (port 79)== provides user information that can be exploited for social engineering attacks; disabling remote access is a recommended countermeasure.


==HTTP (port 80)== can be enumerated using banner grabbing techniques or automated crawlers like Grendel-Scan, which analyze website structures, comments, and hidden directories. Microsoft RPC Endpoint Mapper (port 135) exposes services running on a system and can be queried using tools like `epdump`. To mitigate risks, organizations should block this port at the firewall and consider alternatives like VPNs or Outlook Web Access (OWA) for secure remote access.

>`Sam Spade` for Windows is free

- Crawls sites and reports on vulnerabilities 
- Look for comments, robots.txt file, directories, etc.

**Countermeasure**
Change the banner on your web servers (may fool automated malware).
- Download MS URLScan for IIS v 4 and later 
- Microsoft Internet Information Services has many exploits ready for use.

```ad-info
title: Win Tool
Microsoft RPC Endpoint Mapper (MSRPC), TCP 135 
- Remote Procedure Call (RPC) endpoint mapper (or portmapper) service on TCP 135 - Querying this service can yield information about applications and services available on the target machine

```

```ad-info
title: epdump
- From Microsoft's Windows Resource Kit 
- Shows services bound to IP addresses 
- It takes some research to interpret the results

![[ETH/Images/22.png]]

```

```ad-info
title: LInux tool
In Backtrack, similar results
![[ETH/Images/23.png]]

```

**MSRPC Enumeration Countermeasures**
Block port 135 at the firewall, if you can 
- But some Microsoft Exchange Server configurations require access to the endpoint mapper by remote user 
- You can avoid that by using Virtual Private Networks to internal network, or 
- Outlook Web Access (OWA) which works over HTTPS 
- Exchange 2003 and later implements RPC over HTTP


- ==NetBIOS services (ports 137 UDP)== allow attackers to list domain members, services, and user accounts. Tools like `NBTSTAT` and `NET VIEW` facilitate this enumeration, while countermeasures include disabling unnecessary NetBIOS services and blocking related ports. SMB (port 445) is particularly dangerous due to null session vulnerabilities, which allow unauthorized users to extract sensitive data. Restricting anonymous access and auditing security policies are essential defenses.

Windows needs to change a computer name to an IP address to send data packets Windows uses two naming systems: 
- DNS (the preferred method) 
- NetBIOS Name Resolution (still used by all versions of Windows)

![[ETH/Images/24.png]]
![[ETH/Images/25.png|665]]

**NET VIEW**
NET VIEW can list the domains, or the computers in each domain
![[ETH/Images/26.png]]

**NBNS over TCP/IP**
Normally NBNS only works on the local network segment.
It is possible to route NBNS over TCP/IP, allowing enumeration from a remote system.

**Other Tools to Enumerate NBNS**
- NLTEST and NETDOM can find domain controllers
- NETVIEWX finds specific services
- NBTSTAT collects information from a single system
- NBTSCAN scans a whole range of addresses, and dumps the whole NetBIOS name table
- NMBscan in Kali Linux

**NBTSCAN**
![[2Semester/ETH/Images/44.png]]

### Stopping NetBIOS Name Services Enumeration
All the preceding techniques operate over the NetBIOS Naming Service, UDP 137. Block UDP 137 at the firewall, or restrict it to only certain hosts. To prevent user data from appearing in NetBIOS name table dumps, disable the Alerter and Messenger services on individual hosts. Blocking UDP 137 will disable NBNS name authentication, and stop some applications.

### NetBIOS Session, TCP 139
These are the notorious Null Sessions. The Windows Server Message Block (SMB) protocol hands out a wealth of information freely. Null Sessions are turned off by default in Win XP and later versions, but open in Win 2000 and NT. They are NOT available in Win 95, 98, or Me.

### Null Session Against Win 2000
![[2Semester/ETH/Images/45.png]]

### Information Available
Null sessions on Win 2000 and NT provide information about:
- Shares
- User accounts
- Password policies

### DumpSec – free tool
Enumerate file permission, services, ecc.
![[2Semester/ETH/Images/46.png]]

### Enumerate file permission, services, ecc.
The Registry can be viewed remotely with reg (MS built-in) or DumpSec. This requires Administrator privileges by default on Windows servers - you can NOT do it with null sessions. Gary McKinnon used remote registry access to hack into the Pentagon.

![[2Semester/ETH/Images/47.png]]

## Security Identifier (SID)
SID is a unique, immutable identifier of security principal: a user, user group,...
-  S-1-5-21-1180699209-877415012- 3182924384-1004
-  Relative Identifier (RID)

![[2Semester/ETH/Images/48.png]]

>Changing the last 3 numbers of another account's SID to 500 for Admin.

### User Enum - user2sid/sid2user
These utilities can get user account names and SID remotely, even if blocking anonymous connections (the registry key RestrictAnonymous is set to 1). They can find the Administrator's account name, even if it's renamed. This works against NT family OS, but not Win XP SP2.

![[2Semester/ETH/Images/49.png]]

### All-in-One Null Session Enumeration Tools
- Winfingerprint
- Through Active Directory and WMI
-  Winfo
- NBTEnum 3.3

![[2Semester/ETH/Images/50.png]]

### SMB Null Session Countermeasures
Block TCP 139 and 445 at the network perimeter. Set the RestrictAnonymous registry key to 1 (or 2 on Win 2000 and later) using regedt32. The key is located at HKLM\SYSTEM\CurrentControlSet\Control\LSA. This can be bypassed by querying NetUserGetInfo API call at Level 3 - tools like NBTEnum and Userinfo bypass it. Anonymous Access settings do not apply to remote Registry access, so ensure the Registry is locked down (reference: [http://support.microsoft.com/kb/153183](http://support.microsoft.com/kb/153183)). Finally, audit yourself with dumpsec.

### SNMP, UDP 161
Simple Network Management Protocol (Security Not My Problem). SNMP is intended for network management and monitoring It provides inside information on net devices,
software and systems.

> Administrators use SNMP to remotely manage routers and other network devices

### Community Strings
SNMP has a minimal security system called SNMP Community Strings. Community strings act like passwords. There are three kinds of SNMP Community strings: Read-Only, Read-Write, and Trap (Trap is rarely used). But the community strings are often left at obvious defaults like 'public' and 'private'. Attackers often use Wireshark to obtain the community string by packet inspection.

### Management Information Bases (MIBs)
The MIB contains a SNMP device's data in a tree-structured form, like the Windows Registry. Vendors add data to the MIB. Microsoft stores Windows user account names in the MIB.

### Data Available Via SNMP Enumeration
- Running services
- Share names
- Share paths
- Comments on shares
- Usernames
- Domain name

## SNMP Enumeration Tools
- **snmputil** from the Windows NT Resource Kit
- **snmpget** or snmpwalk for Linux (netsnmp suite)
- **IP Network Browser** graphical tool by Solarwinds

![[2Semester/ETH/Images/51.png]]


## Worse than Enumeration
Attackers who guess the SNMP community string may be able to remotely control your network devices

## SNMP Enumeration Countermeasures
Remove or disable unneeded SNMP agents. Change the community strings to non-default values. Block access to TCP and UDP ports 161 (SNMP GET/SET) at the network perimeter devices. Restrict access to SNMP agents to the appropriate management console IP address.

Use SNMP V3—much more secure than V1 or 2—as it provides enhanced encryption and authentication mechanisms. Adjust Win NT registry keys to make SNMP less dangerous.

## BGP, TCP 179
Border Gateway Protocol (BGP) is the de facto routing protocol among Autonomous Systems
-  Organizations with more uplinks use BGP
- Use AS-Number to guide packets to their destinations.
-  ASN: unique IP-like for a large organization
- BGP can be used to enumerate all the networks of a particular corporation (AS-Number)
-  That may give more targets to attack
- No countermeasure, BGP cannot be blocked

## Windows Active Directory LDAP TCP/UDP 389 and 3268
Active Directory contains all user accounts, groups, and other information on Windows domain controllers. If the domain is made compatible with earlier versions of Windows, such as Win NT4 Server, any domain member can enumerate Active Directory. The MS tool ldp.exe can be used for this purpose.

## Active Directory Enumeration Countermeasures
Filter access to ports 389 and 3268 at the net perimeter devices
-  Legacy-compatible mode vs. Native Win 2000
- If possible use "Native" domains - do NOT allow Win NT4 Domain Controllers

## Enumerating Common Network Services
Other services include: Microsoft RPC endpoint mapper on TCP 135 (tools: epdump, rpcdump.py); NetBIOS name service on UDP 137 (tools: net view, nltest, nbtstat, nbtscan, nmbscan); NetBIOS session on TCP 139/445 (commands: net use, net view); SNMP on UDP 161 (tools: snmputil, snmpget, snmpwalk); BGP on TCP 179 (access via telnet); LDAP on TCP/UDP 389/3268 (used by Active Directory Administration Tool); UNIX RPC on TCP/UDP 111/32771 (tool: rpcinfo); rwho and rusers services; SQL resolution service on UDP 1434 (tool: SQLPing); Oracle TNS (Transparent Network Substrate) on TCP 1521/2483; NFS on TCP/UDP 2049; and IPsec/IKE on UDP 500.