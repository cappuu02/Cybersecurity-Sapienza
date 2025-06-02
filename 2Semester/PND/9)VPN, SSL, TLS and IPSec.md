
# VPN Principles
```ad-abstract
title: Definition
A virtual network, built on top of an existing network infrastructure, which can provide a secure communications mechanism for data and other information transferred between two endpoints

```

Typically based on the use of encryption, but several possible choices for:
- How and where to perform the encryption
- Which parts of communication should be encrypted
- Important subsidiary goal: usability
	- If a solution is too difficult to use, it will not be used poor usability leads to→ no security

## Security Goals for a VPN
**Traditional**
- Confidentiality of data
- Integrity of data
- Peer Autentication

**Extended**
- Replay Protection
- Access Control
- Traffic Analysis Protection

## Traffic Analysis
![[2Semester/PND/images PND/158.png]]


## Usability goals
Transparency (something that does not impact on the software that we use)
- VPN should be invisible to users, software, hardware.
Flexibility ()
-  VPN can be used between users, applications, hosts, sites.
Simplicity
- VPN can be actually used

## Site-to-site security
![[2Semester/PND/images PND/159.png]]

we want to emulate an internet zone that filter our traffic from a site to another site.

## Host-to-site security
![[2Semester/PND/images PND/160.png]]

## Host-to-host security
![[2Semester/PND/images PND/161.png]]

>Protezione tra due siti oppure tra host e sito oppure tra due host!

## Physical layer
![[2Semester/PND/images PND/162.png]]

## Datalink layer: protect a single link
![[2Semester/PND/images PND/163.png]]

- Confidentiality: on link (”virtual cable”)
- Integrity: on link
- Authentication: none
- Replay protection: none
- Traffic analysis protection: on link
- Access control: physical access
- Transparency: full transparency
- Flexibility: can be hard to add new sites
- Simplicity: excellent!

## Network layer: protect end-to-end between systems
![[2Semester/PND/images PND/164.png]]
- Confidentiality: between hosts/sites
- Integrity: between hosts/sites
- Authentication: for host or site
- Replay protection: between hosts/sites
- Traffic analysis protection: host/site information exposed
- Access control: to host/site
- Transparency user and SW transparency possible
- Flexibility: may need HW or SW modifications
-  Simplicity: good for site-to-site, not good for host-to-site

>most challenges things that we have in VPN

## Transport layer: Protection end-to-end between processes
![[2Semester/PND/images PND/165.png]]


- Confidentiality: between apps/hosts/sites
- Integrity: between apps/hosts/sites
- Authentication: for user, host, site
- Replay protection: between apps/hosts/sites
- Traffic analysis protection: protocol/host/site info. exposed
- Access control: user/host/site
- Transparency user and SW transparency possible
- Flexibility: HW or SW modifications
- Simplicity: good for site-to-site, not good for host-to-site

## Application layer: Security for a single application
![[2Semester/PND/images PND/166.png]]

- Confidentiality: between users/apps
- Integrity: between users/apps
- Authentication: user
- Replay protection: between apps
- Traffic analysis protection: all but data exposed
- Access control: only data access secured
- Transparency: only user transparency
- Flexibility: SW modifications
- Simplicity depends on application

## VPN: Then?
It looks best to introduce security in the
- Transport layer
-  Network layer
These are the most popular choices for VPNs. Other options:
- Secure Application layer protocols: only protect a single application, but are often used for specialized purposes, e.g. S/MIME or PGP for secure e-mail
- Secure Data Link layer protocols: are mostly used with PPP or other modem- based communication. e.g. PPTP, L2TP, LTF

## Tunneling
Operation of a network connection on top of another network connection.
It allows two hosts or sites to communicate through another network that they do not want to use directly.

>Concetto molto ad alto livello.

![[2Semester/PND/images PND/167.png]]

### Site-to-site tunneling
Enables a PDU to be transported from one site to another without its contents being processed by hosts on the route.
==Idea==: Encapsulate the whole PDU in another PDU sent out on the network connecting the two sites.
-  Encapsulation takes place in edge router on src. site.
-  Decapsulation takes place in edge router on dst. site.

>Note that the host-to-host communication does not need to use IP

![[2Semester/PND/images PND/168.png]]

>Procedimento MPLS. 

### Secure tunneling
![[2Semester/PND/images PND/169.png]]

- ==Enables a PDU to be transported from one site to another without its contents being seen or changed by hosts on the route.==
-  Idea: Encrypt the PDU, and then encapsulate it in another PDU sent out on the network connecting the two sites.
	- Encryption can take place in edge router on src. site. 
	- Decryption can take place in edge router on dst. site.

>Note: dst. address in IP header is for dst. edge router


Tunneling offers the basic method for providing a VPN.
- Where in the network architecture to initiate and terminate the tunnel:
	- Router/firewall?
	- Special box?
	- Host?
	- Application?
- Which layer to do the tunneling in:
	- Transport layer?
	- Network layer?
 - Other possibilities (see previous discussion)
- And of course: Is tunneling the only possible technique?

## Two main VPN modes

==Split tunneling:== Some traffic goes through tunnel, other traffic uses remote user’s default gateway.

![[2Semester/PND/images PND/170.png]]


==Full tunneling:== All network traffic goes through tunnel

![[2Semester/PND/images PND/171.png]]

# VPN device placement

## SSL VPN Device placement
Device placement is a challenge because it affects:
-  Security
-  Functionality
- Performance
Main options for placement:
-  VPN functionality in firewall
- VPN device in internal network
-  Single-interface VPN device in DMZ
- Dual-interface VPN device in DMZ
Remember: Cryptographic protection only extends from VPN client systems to the SSL VPN device.

## Firewall with an SSL VPN
![[2Semester/PND/images PND/172.png]]

## VPN-enabled firewall
The VPN device communicates directly with internal hosts
- Advantages
	- No holes in FW between external VPN device and internal network.
	- Traffic between device and internal network must go through FW.
	- Simple network administration since only one “box” to administer.
- Disadvantages
	- Limited to VPN functionality offered by FW vendor.
	- FW directly accessible to external users via port 443.
	- Adding VPN functionality to FW can introduce vulnerabilities.

> Note: TCP port 443 (standard) must be open on external FW interface, so clients can initiate connections

## SSL VPN in internal network
![[2Semester/PND/images PND/173.png]]

## VPN internal
Advantages
-  Only single rule for single address to be added to FW.
- No “holes” needed in FW between VPN device and internal network.
- VPN traffic is behind FW, so protected from attacks by machines in DMZ.
Disadvantages
-  VPN traffic passes through FW on tunnel, so it is not analyzed.
-  Unsolicited traffic can be sent into internal network from outside to internal VPN device.
-  Internal network is compromised if VPN device is compromised.

>Note: TCP port 443 (standard) opened on FW for the address of the device.

## SSL VPN In DMZ
![[2Semester/PND/images PND/174.png]]

## DMZ with VPN
Advantages
- Internal network protected against compromised VPN device.
- Traffic between device and internal network must go through FW.
- IDS in DMZ can analyze traffic destined for internal network.
Disadvantages
- Numerous ports open in FW between device and internal hosts.
- Decrypted traffic from device to internal network must be sent through DMZ.
- FW bypassed when user traffic is destined for hosts in DMZ.

> Note: TCP port 443 (standard) opened on FW for the address of the device

## Dual interfaces VPN device in DMZ
![[2Semester/PND/images PND/175.png]]

Clients connect to external device interface, internal traffic uses internal interface.
==Advantages==
- All advantages of placing VPN device DMZ.
-  Unencrypted traffic to internal hosts is protected from other hosts in DMZ.
- Only FW interface connected to device’s internal interface needs to permit traffic from VPN device.
==Disadvantages==
-  Numerous ports open in FW between device and internal hosts.
- May introduce additional routing complexity.
- FW bypassed if split tunneling is not used and user traffic is destined for hosts in DMZ

# SSL Tunneling

## Secure Sockets Layer (SSL) and Transport Layer Security (TLS)
One of the most widely used security services
General-purpose service implemented as a set of protocols that rely on TCP
Subsequently became Internet standard RFC4346: Transport Layer Security (TLS)

Two implementation choices:
- Provided as part of the underlying protocol suite
- Embedded in specific packages

SSL 3.0 has become TLS standard (RFC 2246) with small changes
- Applies security in the Transport layer.
- Originally designed (by Netscape) to offer security for client-server sessions.
- If implemented on boundary routers (or proxies), can provide a tunnel between two sites – typically LANs.
- Placed on top of TCP, so no need to change TCP/IP stack or OS.
-  Provides secure channel (byte stream)
	- Any TCP-based protocol
	-  https:// URIs, port 443
	- NNTP, SIP, SMTP...
- Optional server authentication with public key certificates
	- Common on commercial sites

## How HTTPS (HTTP on top of TLS) works
![[2Semester/PND/images PND/176.png]]


## SSL protocol Architecture
Adds extra layer between T- and A-layers, and extra elements to A-layer

Record Protocol: Protocol offering basic encryption and integrity services to applications

Application Protocols: control operation of the record protocol
- Handshake: Used to authenticate server (and optionally client) and to agree on encryption keys and algorithms.
- Change cipher spec: Selects agreed keys and encryption algorithm until further notice.
- Alert: Transfers information about failures.

![[2Semester/PND/images PND/177.png]]

## TLS Record protocol operation
![[2Semester/PND/images PND/178.png]]

## Handshake protocol exchange
Shaded transfers are optional or situation-dependent messages that are not always sent.

![[2Semester/PND/images PND/179.png]]

4-phase “Client/Server” protocol to establish parameters of the secure connection (“Client” is the initiator):
1) Hello: Establishment of security capabilities: Client sends list of possibilities, in order of preference. Server selects one, and informs Client of its choice. Parties also exchange random noise for use in key generation.
2) Server authentication and key exchange: Server executes selected key exchange protocol (if needed). Server sends authentication info. (e.g. X.509 cert.) to Client.
3) Client authentication and key exchange: Client executes selected key exchange protocol (mandatory). Client sends authentication info. to Server (optional).
4) Finish: Shared secret key is derived from pre-secrets exch. in 2, 3. Change Cipher Spec. protocol is activated. Summaries of progress of Handshake Protocol are exchanged and checked by both parties.

## Can we trust a public key?
![[2Semester/PND/images PND/180.png]]

## Digital certificates
- A document that certifies the relation between a public key and its owner
 - How? With a digital signature…
- But, to verify a digital signature, we need another public key!
- Then??
- We need a public key that we trust
- Trusted public keys are stored in certificates of Certification Autorities (CA)

## Public key certificate use (IMPORTANT FOR EXAM)
![[2Semester/PND/images PND/181.png]]

## Certification Authority (CA)
An organization that issues digital certificates
The CA performs many tasks:
-  Receive application for keys.
-  Verify applicant’s identity, conduct due diligence appropriate to the trust level, and issue key pairs.
- Store public keys and protect them from unauthorized modification.
-  Keep a register of valid keys.
- Revoke and delete keys that are invalid or expired. Maintain a certificate revocation list (CRL).
Certificates of CAs are stored in any computer that want to use internet securely

## PKI: Public Key Infrastructure
Certification authorities are organized in a hierarchy, called Public Key Infrastructure
To verify a certificate, one needs to verify all the signatures up to the top of the hierarchy. X.509 is the standard.

![[2Semester/PND/images PND/182.png]]

## Certificate Authority (CA)
![[2Semester/PND/images PND/183.png]]

## X.509
Specified in RFC 5280
- The most widely accepted format for public-key certificates
- Certificates are used in most network security applications, including:
	- IP security (IPSEC)
	- Secure sockets layer (SSL)
	- Secure electronic transactions (SET)
	- S/MIME
	- eBusiness applications

## X.509 certificate
![[2Semester/PND/images PND/184.png]]

## SSL/TLS Security Capabilities
 Conventionally expressed by a descriptive string, specifying:
- Version of SSL/TLS
- Key exchange algorithm
- Grade of encryption (previous to TLSv1.1)
- Encryption algorithm
- Mode of block encryption (if block cipher used)
- Cryptographic checksum algorithm
Example: TLS_RSA_WITH_AES_128_CBC_SHA
-  TLS (Latest version of) TLS→
- RSA RSA key exchange→
- WITH (merely filler...)→
- AES_128 128-bit AES encryption→
- CBC Cipher Block Chaining→
- SHA Use HMAC-SHA digest

## Key exchange and authentication
Possible ways of agreeing on secrets in TLS are:
- RSA: RSA key exch. (secret encrypted with recipient’s publ. key)
- DHE RSA: Ephemeral Diffie-Hellman with RSA signatures
-  DHE DSS: Ephemeral Diffie-Hellman with DSS signatures
- DH DSS: Diffie-Hellman with DSS certificates
- DH RSA: Diffie-Hellman with RSA certificates
- DH anon: Anonymous Diffie-Hellman (no authentication)
- NULL No key exch.

Variant: If followed by “EXPORT_”, weak encryption is used. (This option only available prior to TLSv1.1)

Note: “Key exchange” only establishes a pre-secret! From this, a master secret is derived by a pseudo  random function (PRF). Shared secret encryption key is derived by expansion of master secret with another PRF. (In TLS several keys are derived for different purposes.)

## SSL Master Secret
![[2Semester/PND/images PND/185.png]]

## TLS Master Secret
![[2Semester/PND/images PND/186.png]]

## SSL/TLS Heartbeat
It is an extension (RFC 6520) that allows to keep an established session alive. That is, as soon as the data exchange between two endpoints terminates, the session will also terminate
To avoid the re-negotiation of the security parameters for establishing a secure session, we can keep using the same parameters even if there is no exchange of data.

> It introduces two messages: HeartbeatRequest and HeartbeatResponse.

## Heartbeat exchange
When one endpoint sends a HeartbeatRequest message to the other endpoints, the former also starts what is known as the retransmit timer.
During the time interval of the retransmit timer, the sending endpoint will not send another HeartbeatRequest message. An SSL/TLS session is considered to have terminated in the absence of a HeartbeatResponse packet within a time interval.

## Heartbeat payload
As a protection against a replay attack, HeartbeatRequest packets include a payload that must be returned without change by the receiver in its HeartbeatResponse packet
The Heartbeat message is defined as:
![[2Semester/PND/images PND/187.png]]

## Heartbleed bug
Bug in OpenSSL library (4/4/2014)
The receiver of request did not check that the size of the payload in the packet actually equaled the value given by the sender to the payload length field in the request packet
- The attacker sends little data but sets the size to max
- The receiver allcates that amount of memory for the response and copied max bytes from the mem location where the request packet was received
-  Then, the actual payload returned could potentially include objects in the memory that had nothing to do with the received payload
- Objects could be private keys, passwords, and such..

## SSL VPN Architecture
Two primary models:
●
SSL Portal VPN
– Remote users can access web-
based services provided on the
gateway
– VPN gateway is reachable from a
Web browser
●
SSL Tunnel VPN
– Remote users can access network
services protected by VPN
gateway
– More capabilities than portal
VPNs, as easier to provide more
services

## SSL VPN functionalities
Most SSL VPNs offer one or more core functionalities:
● Proxying
– Intermediate device appears as true server to client
● Application translation
– Conversion of information from one protocol to another.
● e.g. Portal VPN offers translation for applications which are not Web-enabled, so
users can use Web browser to access applications with no Web interface.
● Network extension
– Provision of partial or complete network access to remote users, typically via
Tunnel VPN