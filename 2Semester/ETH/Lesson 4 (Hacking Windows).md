# Hacking Windows – Summary

## Windows Security Issues
Windows vulnerabilities arise from backward compatibility, feature proliferation, and widespread use. Attackers exploit weak configurations, focusing on network services, kernel drivers, and applications. Major exploits include Code Red, Nimda, Slammer, and EternalBlue.

## Unauthenticated Attacks

### Four Vectors 
- Authentication Spoofing (password)
- Network Services
- Client Software Vulnerabilities
- Device Drivers

>Protect weakness in these areas

#### Authentication Spoofing Attacks
Hackers target authentication spoofing, network services, client software vulnerabilities, and device drivers. Common exploits involve SMB (TCP 445, 139), MSRPC (TCP 135), Terminal Services (TCP 3389), SQL (TCP 1433), and SharePoint (TCP 80, 443). Tools like Cain and SMBRelay enable credential theft through sniffing and MITM attacks. Pass-the-Hash and Pass-the-Ticket techniques allow access without cracking passwords.

**Password Guessing from the CL**
![[ETH/Images/27.png]]

**A password Guessing Script**
![[28.png]]
![[29.png]]
#### Password Guessing Countermeasures
Restrict SMB access using network firewalls and Windows security features like IPSec filters and Windows Firewall. Disabling SMB services further reduces risk. Enforce strong passwords and account lockout policies, ensuring they apply to the Administrator account. Enable logon failure auditing and regularly review event logs for suspicious activity. Combining these measures enhances defense in depth.


### Security Policy
![[30.png]]

### Audit Policy
Use a log analysis tool to check the logs `Microsoft Dumpel (Windows 2000 Resource Kit)`
	`C:\> dumpel -e 529 –f seclog.txt -l security –n Security -t`
For even better security, use Intrusion Detection/Intrusion Prevention software






### Unauthenticated Attacks (Authenticated Spoofing)
Remote password guessing
- Main target
- Automatic guessing on the CLI
- Automatic guessing on GUI of terminal service/remote desktop Services

### Eavesdropping on Network Password Exchange
You can sniff LAN Manager (LM) password challenge-response hashes with Cain (most
used).

![[31.png]]

### Kerberos
![[32.png|600]]

#### Kerberos sniffing
Kerberos 5 sends a preauthentication packet which contains a timestamp encrypted with a
key derived from the user's password.
- Offline attack on that exchange can reveal a weak password
- Cain has an MSKerb5-PreAuth packet sniffer
There's no simple defense against this, except using long, complex, passwords

![[33.png]]

### Unauthenticated Attacks (Windows Authentication Sniffing Countermeasures)
Disable LM authentication. NT LAN Manager (NTLM) hashes are harder to crack. Dictionary
attacks
- Pick good passwords (password complexity features)
- Do not allow dictionary password
- Use public key encryption
- Use built-in Windows IPsec to authenticate and encrypt traffic

### Unauthenticated Attacks (Eavesdropping on Network Password Exchange)
Three authentication protocols: LM (LAN Manager) (with hash), NTLM (with encryption),
Kerberos (with private or optional public key encryption)
-  Attack tools: Cain, LCP, L0phtcrack, KerbSniff
- Sniffing, brute-force cracking, dictionary cracking
- To sniff on a switched network: ARP spoofing/poisoning to redirect traffic through attackers

### Man in the Middle Attacks
SMBRelay and SMBProxy pass authentication hashes along, to get authenticated access to
the server.
- SMB Credential Reflection Attack
- SMB Credential Forwarding Attack

![[Pasted image 20250318090945.png]]
#### CAIN
Cain: ARP Poisoning, downgrade Auth versions
Can sniff Remote Desktop sessions, breaking their encryption (For Windows XP and Windows Server 2003)

#### Countermeasures
If attacker is already on your LAN, very hard
Use authenticated and encrypted protocols
Enforce them with Group Policy and firewall rules
Verify identity of remote servers with strong authentication or trusted third parties

### Unauthenticated Attacks (Man-in-the-Middle Attacks (MITM))
Man-in-the-Middle (MITM) attacks intercept authentication exchanges to gain unauthorized access. SMBRelay captures credentials from SMB traffic, while ARP spoofing and DNS redirection trick victims into connecting to malicious servers. Tools like Cain and SMBRelay3 facilitate these attacks by downgrading authentication protocols. Countermeasures include enforcing encryption, strong authentication, and disabling NetBIOS in favor of DNS.

### Pass-the-Hash
1. Compromise a machine
2. Dump password hashes stored in RAM
3. Use them as credentials for network services without cracking them
- Allow to compromise the Windows domain after compromising a single machine.
- Administrator logged into the compromised machine BEFORE the compromise, also taken

### Windows Credential Editor
![[34.png]]
![[35.png]]

### Passwords are Encrypted
![[36.png]]

### Pass-the-Ticket for Kerberos
Dump existing Kerberos RAM tickets and re- use them . WCE can replay and re-use tickets, but must compromise a host first

**Countermeasures**
NTLM is vulnerable by design; no fix available Prevent intrusions in the first place, since this
is a post-exploitation technique. If possible, use two-factor authentication.

### Unauthenticated Attacks (Pass-the-Hash)
Use LM and/or NTLM hash of a user’s password
-  No need to crack/brute-force the hash to cleartext password
- Allows to gain authorized access
- Limitations: Not all functionalities of the protocol are implemented
- Dump/modify NTLM credentials stored in memory and replay
-  Windows Credentials Editor (WCE)
-  Pass the ticket for Kerberos.
- WCE: dump Windows Kerberos tickets and reuse them

## Remote Unauthenticated Exploits
- Flaws or misconfigurations in Windows software itself
	- TCP/UDP services → driver interface, user-mode applications (MS Office, Internet Explorer, Adobe Acrobat Reader)
- Metaexploit
	- Framework plus archive of exploit modules
	- Locate/search the exploit module
	- Customize exploit parameters (vendor and model of victim software), payloads (remote command shell, users, injecting prebuilt code), and options (target IP address, IDS evasion, etc.)

### Metasploit
- Easily exploits network services
- Typically a couple of months behind Microsoft alerts
- CORE IMPACT and Canvas are expensive, but better

>Metasploit includes the Print Pooler Service vulnerability exploit, used by stuxnet to attack an iranian nuclear reactor

### Network Service Exploit Countermeasures
Apply patches quickly
Use workarounds for unpatched vulnerabilities:
- disable weak services,…
- Audit, Log and monitor traffic
-  Have an incident response plan: Computer Security Incident Response Team (CSIRT), a group include information security and general IT staff, representatives legal, human resources and public relations departments. Produce plan with the organization's response to a cyberattack.

### End-user Application Exploits
End users the weakest link. Less professional on security, Poorly managed rich software
ecosystem
- Worst Offenders:
	Adobe Flash Player in browser. Display of rich media and animated content over Internet
-  Adobe PDF Reader
Metaexploit (search /w adobe flash)

>Adobe flash VUlnerability

### End-user Application Exploits
Countermeasures
- Use a firewall to limit outbound connections
- Patches
- Antivirus, particularly on email-attach
- Run with least privilege; if browsing Internet, never as Administrator
-  Use software security options, such as read email in plaintext
-  Configure MS Office to very high macro security

### Device Driver Exploits
There were buffer overflows in wireless device drivers for MS
It is possible to own every vulnerable machine in range just with a beacon frame
NO connection required by the victim