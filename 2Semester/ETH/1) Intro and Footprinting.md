
# Introduction

## Part I Casing The Establishment Case Study: How A Hacker Works
IAAAS (It’s All About Anonymity, Stupid). The Onion Router (Tor), [www.torproject.org](http://www.torproject.org). Layered cryptography with SOCKS proxy. Anonymous outgoing TCP connections. Tor GUI client (Vidalia) and Privoxy (web filtering proxy). Google on browser for juicy targets. tor-resolve instead of host for IP addresses. proxychains to force connections through Tor. Nmap to scan services on targets. socat to relay persistently. nc (netcat) to send requests to servers (check server version). Exploit vulnerabilities to pwn (own or compromise).

## The Onion Router (TOR)
![[4ka.png]]![[5ka.png]]
>==Vidalia== is a discontinued cross-platform GUI for controlling Tor. It allows the user to start, stop or view the status of Tor

## Privoxy
```ad-abstract
title: Definition
Privoxy is a free web proxy for enhancing privacy, manipulating cookies and modifying web page data and HTTP headers before the page is rendered by the browser. E.g. filtering web pages and removing advertisements. Privoxy can be customized by users.

```


## Tor-resolve
**tor-resolve** is a simple script to connect to a SOCKS proxy that knows about the SOCKS RESOLVE command, hand it a hostname, and return an IP address. https://linux.die.net/man/1/tor-resolve.

`tor-resolve www.example.com 10.10.10.100`

## Proxychains
**Tor with Proxychains** is a method to route all network traffic through the **Tor network** for anonymity.

- **Tor** provides encrypted, multi-layered routing (onion routing) to hide your IP.
- **Proxychains** forces applications (like `curl`, `nmap`, or browsers) to use Tor as a proxy, even if they don’t natively support it.

## NMAP
```ad-abstract
title: Definition

Nmap is a free software distributed under the GNU GPL by Insecure.org created to perform port scanning, that is, aimed at identifying open ports on a target computer or even ranges of IP addresses, in order to determine what network services are available. [nmap_cheatsheet](https://www.stationx.net/nmap-cheat-sheet/)
```


## socat
This commands opens a proxy listening on localhost:8080 and forwards all requests through Tor to the target 10.10.100:80.
`socat TCP4-LISTEN:8080, fork SOCKS4a:127.0.0.1:10.10.10.100:80, socksport=9050 &`

# Footprinting (Chapter1)
Internet footprinting
1. Determine the scope of your activities
2. Get proper authorization
3. Publicly available information
4. WHOIS & DNS enumeration
5. DNS interrogation
6. Network reconnaissance

## What is Footprinting?
==Footprint==: profile of the target organization. 
Why? It gives you a picture of what the hacker sees.
What to footprint/profile?
- **Internet**: domain names, network blocks and subnets, IP addresses, TCP/UDP services, CPU arch, access control, IDS, system enumeration, DNS hostnames
-  **Intranet**: network protocols, internal domain names, network blocks, IP addresses, TCP/UDP services, CPU arch, access control, IDS, system enumeration
- **Remote access**: phone numbers, remote system type, authentication mechanisms, VPN
- **Extranet**: domain names, connection source and destination, type of connection, access control

## Internet Footprinting
**Step 1**: Determine the scope of your activities
- Entire organization or subsidiaries?
- Determine all, so as to secure them
**Step 2**: Get proper authorization
- Layers 8 and 9: politics and funding
- Get-out-of-jail-free card
**Step 3**: Publicly available information
- Nothing short of amazing!

## Publicly Available Information 

### Company Web Pages
Unexpected: security configuration, asset inventory spreadsheet, etc. HTML source code (offline faster). Things buried in comment tags: <, !, --. Website mirroring tools for offline viewing: Wget (Linux), Teleport Pro (Windows). Enumerate hidden files and directories recursively. OWASP’s DirBuster. Easy to be detected: proxy through privoxy. Remote access to internal resources via browser. Proxy to internal servers (e.g. Microsoft Exchange server). Look for other sites beyond the main. www1, www2, web, test, etc. VPN sites

### Related Organizations Location Details
**Related organizations** – Look for references and links to other organizations. **Outsourced web development** – Partners might not be security-minded, enabling social engineering attacks. **Location details needed** for dumpster-diving, surveillance, social engineering, unauthorized access, etc. **Images** can reveal critical data. Use **Google Earth, Google Maps (Street View)** to gather Wi-Fi MAC addresses. Services like **Google Locations and Skyhook** map MAC addresses to physical locations (referenced in the _‘How I Met Your Girlfriend’_ BlackHat 2010 demo).

### Employee Information 
Personal information (names, phone numbers) can be used to obtain email addresses, physical addresses, and sensitive details (SSN, credit history) through sites like 411.com, peoplesearch.com, and social networks (Facebook, LinkedIn). Professional platforms (Monster.com, Ancestry.com) and paid services (Jigsaw.com) present additional data. For structured searches, use the OSINT Framework.

Job ads and resumes also reveal critical details (e.g., company firewalls). Searching for "company resume firewall" on Google or sites like CareerBuilder can identify employees (past/present), especially disgruntled ones. Employee personal computers are vulnerable entry points (keyloggers, impersonation of trusted users).

### Current Events
Mergers, acquisitions, scandals, layoffs, rapid hiring, reorganization, outsourcing, temporary contractors. Merger or acquisition. Blending of organizations’ networks. Less or disabled security. Human factor. Low morale → update resumes. Unauthorized guests. SEC (Security and Exchange Commission) reports. Periodical reporting: 10-Q (quarter) and 10-K (annual). Sec.gov → organizational charts. Business info and stock trading sites. Yahoo!Finance message boards.

### Privacy or Security Policies Archived Information

Privacy or security policies
- Technical details indicating the types of security mechanisms in place
Archived information
- Archived copies > current copies
- Archive.org & cached results at Google

### Search Engines and Data Relationships
- Google.com, bing.com, yahoo.com, dogpile.com, ask.com
- Search strings used by hackers
- Search Google’s cache for vulnerabilities, errors, configuration issues
- Analyze metadata in web files for info leaks

## WHOIS and DNS Enumeration
Domain names, IP addresses, and port numbers are centrally managed by ICANN (Internet Corporation for Assigned Names and Numbers) and hierarchically stored in WHOIS/DNS servers. The three R of WHOIS: **registry**, **registrar**, **registrant**. To lookup keyhole.com, start from whois.iana.org. Find the registry and registrar for .com (verisign-grs.com) and then keyhole.com (markmonitor.com). Find the registrant details of keyhole.com (for later spoofing). Use web whois or command-line whois. Automatic tools (allwhois, uwhois) and GUI tools (superscan, netscan tools pro) are available. To lookup 61.0.0.2, start from arin.net. Find apnic.net, then find National Backbone of India. But keep in mind the IP address might be spoofed/masqueraded.

![[2Semester/ETH/Images/38.png]]

### Public Database Security Countermeasures
- Keep administrative contacts up-to-date
- Anonymize administrative contacts
- Authenticate updates rigidly to avoid domain hijacking
	- Using passwords or PGP, not FROM field of email addresses
	- AOL in 1998: redirected traffic

### DNS - Start Of Authority (SOA) record
![[2Semester/ETH/Images/39.png]]

### DNS record types
![[2Semester/ETH/Images/40.png]]


## DNS Interrogation
Obtain revealing info about the organization by querying DNS servers (domain name <-> IP addresses). DNS zone transfer by untrusted users
- Due to misconfiguration
- From primary server to secondary server
- Private DNS info: internal hostnames and IP addresses
- dnsrecon
nslookup
- mapping and getting all resource records (A, RP, MX, HINFO, etc.)
- HINFO: host info
- Search with grep, sed, awk, perl
- Scripts: dnsenum, dnsmap, fierce, host

![[2Semester/ETH/Images/41.png]]

![[2Semester/ETH/Images/42.png]]

### DNS Security Countermeasures
- Restrict zone transfer to only authorized servers
	- named.conf in BIND
- Configure a firewall to deny unauthorized inbound connections to TCP port 53 (thwart zone transfer) DNS - Domain Name System.
-  Configure not to provide internal DNS info
- Discourage the use of HINFO records


## Network Reconnaissance
Network topology and access path diagram. Use traceroute, tracert, visualroute, McAfee's NeoTrace, Foundstone's Trout, Owasp AMASS to find the exact path (IP nodes - routers, firewall, etc.) and leverage TTL and ICMP. For thwarting network reconnaissance countermeasures, implement intrusion detection with snort or bro, and configure border routers to limit ICMP and UDP traffic to specific systems.

![[2Semester/ETH/Images/43.png]]
