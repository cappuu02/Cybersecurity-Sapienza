
1. Service fingerprinting
2. Vulnerability scanners
3. Basic banner grabbing
4. Enumerating common network services

# Enumeration in Network Security
```ad-abstract
title: Enumeration Definition

==Enumeration== is an **essential phase in penetration testing**, involving the active **extraction of information from a target system**. Enumeration establishes active connections to gather details such as user accounts, network resources, and service configurations. The process can be generic, like basic banner grabbing, or platform-specific, leveraging port scans and OS detection techniques.
```

```ad-attention
title: Scanning vs Enumeration
**Scanning** serve a capire **quali computer e servizi sono attivi**, mentre **Enumeration** entra più nel dettaglio per scoprire **informazioni specifiche** come utenti, nomi di risorse condivise o versioni precise dei servizi.

```

Uno degli **obiettivi principali** dell'enumerazione è:
1. ==recuperare i nomi degli account utente==
2. ==individuare file condivisi== non configurati correttamente
3. ==identificare versioni software obsolete== che potrebbero presentare vulnerabilità note.

Certain network services are particularly valuable for enumeration, including FTP (port 21), Telnet (port 23), and SMTP (port 25). By linking ports, services, and protocols to specific software, attackers can better understand a system’s configuration and potential weaknesses.


## 1) Service Fingerprinting
Il **Service Fingerprinting** è il processo di identificazione **precisa del software** in esecuzione su una porta aperta. Questa operazione può essere eseguita manualmente o automaticamente (Strumenti), bilanciando discrezione ed efficienza.

Tools like `Nmap` use version scanning to match known service responses with specific protocols and versions. 
- The `nmap-services database` maps ports to services,
- while `nmap-service-probe` identifies services based on their responses.

Hidden services may use unexpected ports, such as Timbuktu using TCP port 1417 instead of a standard SSH port. `Amap` provides an alternative method for fingerprinting, using pattern-matching techniques to validate service versions.

```ad-example

An example of service fingerprinting with Nmap involves scanning a target on port 1417. A SYN scan (`nmap -sS target.com -p 1417`) might indicate that the port is open and associated with a specific service. A version scan (`nmap -sV target.com -p 1417`) provides additional details, such as whether it is running OpenSSH 3.7. Service detection ensures accurate results but may require manual verification.

![[ETH/Images/14.png]]

```

## 2) Vulnerability Scanners
Un **vulnerability scanner** è uno strumento automatico che analizza un sistema, host o rete alla ricerca di vulnerabilità note, servizi non aggiornati, configurazioni errate, porte aperte con software pericoloso.

Questi strumenti **confrontano le informazioni raccolte** con un **database di vulnerabilità note**, come:
- CVE (Common Vulnerabilities and Exposures)
- Security advisories (di Microsoft, RedHat, ecc.)

==Strumenti di Vulnerability Scanning (Open Source)==

| OpenVAS | open-source |
| ------- | ----------- |
| Nessus  | fino v2/v3  |

==Strumenti di Vulnerability Scanning (Commerciali)== 

| Nessus         | ultima versione |
| -------------- | --------------- |
| QualysGuard    | Tenable         |
| McAfee         | Qualys          |
| Rapid7 Nexpose | McAfee          |

## 3) Basic Banner Grabbing
==Basic Banner grabbing== is a technique used to collect service banners that reveal software version information. This can be done manually using tools like Telnet (`telnet www.example.com 80`) or automatically with Netcat (`nc -nv target.com 80`). Banner grabbing helps identify potential vulnerabilities based on software versions but can be countered by restricting access to unnecessary services, implementing access control lists, and disabling software version details in banners.

![[ETH/Images/15.png|700]]
![[ETH/Images/16.png|700]]

## 4) Enumerating Common Network Services
Several common network services provide valuable information for enumeration. 

### File Transfer Protocol (FTP 21)
==FTP (port 21)== is widely used for web content uploads but transmits passwords in cleartext, making it susceptible to interception. 
We can googling for FTP server, by searching: `Index of ftp://`. Here's the corresponding overly informative FTP banner:

![[ETH/Images/17.png]]

There are differents alternatives such:
- SFTP (over SSH) , Secure file transfer protocol
- FTPS (over SSL) , File Transfer Protocol Secure

### Telnet (23)
 ==Telnet (porta 23)== presenta rischi simili, consentendo agli aggressori di raccogliere informazioni sul sistema e sull'account in base ai messaggi di errore di login.  Telnet dispone di banner e consente l'enumerazione bruteforce dei nomi utente:
- **Enumerazione del sistema**: visualizza un banner di sistema prima del login: sistema operativo e versione dell'host o fornitore, in modo esplicito o implicito. 
- **Enumerazione dell'account**: tenta il login con un particolare utente e osserva i messaggi di errore.
 
 >Invia password+dati in chiaro
 
 Le contromisure per Telnet includono la sostituzione con SSH, la restrizione dell'accesso per indirizzo IP e la modifica dei banner di sistema. (Non utilizzare Telnet)


### Simple Mail Transfer Protocol (SMTP 25)
==SMTP (port 25)== allows attackers to verify usernames through commands like VRFY and EXPN. Organizations can mitigate this risk by disabling these commands or restricting them to authenticated users.

>automatic tool `vrfy.pl `specify SMTP server and username to test.

**Countermeasures**
**Disable the EXPN and VRFY commands**, or restrict them to authenticated users 
Sendmail and Exchange both allow that in modern versions

![[ETH/Images/18.png]]



### Domain Name System (DNS 53 TCP)
==DNS (porta 53 TCP)== può essere sfruttato attraverso **trasferimenti di zone** se mal configurato, **rivelando la struttura interna di un'organizzazione**. Gli **attaccanti** utilizzano strumenti come `dig` o `nslookup` per eseguire i **trasferimenti di zone** e le difese includono la limitazione delle query DNS e l'utilizzo di server DNS interni ed esterni separati.

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

### Trivial File Transfer Protocol (TFTP 69)
==TFTP (porta 69)== è un protocollo  insicuro che manca di autenticazione, rendendo possibile agli aggressori il recupero dei file. Le organizzazioni dovrebbero avvolgere TFTP in livelli di sicurezza come i TCP Wrapper e limitare l'accesso alla sua directory principale. 

**Contromisure**
Avvolgerlo per limitare l'accesso 
- Utilizzo di uno strumento come TCP Wrappers 
- TCP Wrappers è come un firewall software, che consente solo a determinati client di accedere a un servizio.
Limitare l'accesso alla directory /tftpboot 
Assicurarsi che sia bloccata dal firewall di confine

### Finger (TCP/UDP 79)
The ==Finger protocol (port 79)== provides user information that can be exploited for social engineering attacks; disabling remote access is a recommended countermeasure.

### 🧭 HTTP (TCP 80) - Enumerazione

#### 🔍 Tecniche di enumerazione
- **Banner Grabbing**: Recupero dell’intestazione del server HTTP per identificare software e versione.
- **Web Crawler automatici** (es. **Grendel-Scan**, **Sam Spade**):
    - Analizzano:
        - Struttura del sito
        - Commenti HTML
        - File `robots.txt`
        - Directory nascoste

#### 🛠️ Strumenti

| Strumento               | Descrizione                                            |
| ----------------------- | ------------------------------------------------------ |
| **Grendel-Scan**        | Crawler automatico per l’analisi delle vulnerabilità   |
| **Sam Spade** (Windows) | Gratuito; cerca commenti, file sospetti, directory     |
| **MS URLScan** (IIS)    | Filtra e blocca richieste HTTP potenzialmente malevole |

#### 🛡️ Contromisure HTTP
- **Modifica del banner** del server web (es. Apache, IIS) per ostacolare tool automatici.
- **MS URLScan**: utile per IIS v4 e successive, aiuta a limitare richieste HTTP anomale.
- Monitorare accessi a file come `robots.txt` e directory non linkate.


#### 🧭 Microsoft RPC Endpoint Mapper (MSRPC, TCP 135)
##### 🔍 Funzione
- Fornisce informazioni sui servizi/applicazioni in esecuzione.
- Espone endpoint RPC che possono essere interrogati da remoto.

#### 🛠️ Strumenti

| Strumento                         | Descrizione                                                                            |
| --------------------------------- | -------------------------------------------------------------------------------------- |
| **epdump** (Windows Resource Kit) | Elenca i servizi RPC associati agli indirizzi IP. Risultati complessi da interpretare. |
| **Tool Linux (es. Backtrack)**    | Fornisce output simile a `epdump`                                                      |
#### 🛡️ Contromisure MSRPC
- **Bloccare la porta TCP 135** a livello di firewall (quando possibile).
- **Utilizzare VPN** per accesso remoto sicuro.
- **Preferire Outlook Web Access (OWA)** tramite HTTPS, invece di RPC diretto.
- **Exchange 2003+** supporta **RPC-over-HTTP**, evitando l’esposizione diretta della porta 135.


### NetBios (UDP 137)
==NetBIOS (Network Basic Input/Output System)== è un'interfaccia software che consente la **comunicazione** tra computer all'interno di una rete locale (LAN). Viene utilizzata per condividere file, stampanti e per identificare dispositivi sulla rete tramite nomi NetBIOS, piuttosto che indirizzi IP.

In ambiente Windows, quando un computer deve inviare pacchetti a un altro dispositivo in rete, deve prima tradurre il **nome del computer nell'indirizzo IP** corrispondente. Questo processo può avvenire attraverso due metodi principali:
- **DNS (Domain Name System)**, che è il metodo preferito e più moderno;
- **Risoluzione dei nomi NetBIOS** (==NBNS==), ancora supportata da tutte le versioni di Windows, soprattutto nelle reti locali più datate o miste.

I **servizi NetBIOS (porta UDP 137)** possono rappresentare un rischio per la sicurezza, poiché permettono agli attaccanti di enumerare (ovvero ottenere un elenco di) membri del dominio, servizi attivi e account utente. Strumenti come **NBTSTAT** e **NET VIEW** sono comunemente usati per questa attività di enumerazione.

Per ridurre questi rischi, è consigliabile:
- Disabilitare i servizi NetBIOS non necessari;
- Bloccare le porte associate (come la 137 UDP);
- Limitare l'accesso anonimo;
- Controllare e rafforzare le policy di sicurezza.

Particolare attenzione va data al servizio **SMB (porta TCP 445)**, che può essere sfruttato tramite **null session** (sessioni anonime) per accedere a dati sensibili senza autenticazione. Monitorare e limitare questo tipo di accessi è fondamentale per la sicurezza della rete.

>SMB usava **NetBIOS over TCP/IP** per stabilire connessioni tra dispositivi Windows.

#### NetBios Name System (NBNS Over TCP/IP)
```ad-abstract
title: Definition
È un **protocollo specifico** usato da NetBIOS (è un servizio di NetBios) per **risolvere i nomi NetBIOS in indirizzi IP**, simile al ruolo del DNS per i nomi di dominio. Funziona su **UDP 137**.

```

Normally ==NBNS== only works on the local network segment.
It is possible to route NBNS over TCP/IP, allowing enumeration from a remote system.


**Other Tools to Enumerate NBNS**
- `NLTEST` and `NETDOM` can find domain controllers
- `NETVIEWX` finds specific services
- `NBTSTAT` collects information from a single system
- `NBTSCAN` scans a whole range of addresses, and dumps the whole NetBIOS name table
- `NMBscan` in Kali Linux


**Stopping NetBIOS Name Services Enumeration**
All the preceding techniques operate over the NetBIOS Naming Service, UDP 137. **Block UDP 137 at the firewall, or restrict it to only certain hosts**. To prevent user data from appearing in NetBIOS name table dumps, disable the Alerter and Messenger services on individual hosts. Blocking UDP 137 will disable NBNS name authentication, and stop some applications.

#### NetBIOS NULL Session, TCP 139
Le ==sessioni nulle (null sessions)== sono un meccanismo di comunicazione non autenticata utilizzato dal protocollo **SMB (Server Message Block)**, che gira su **NetBIOS** tramite **porta TCP 139**.

Una **sessione nulla** è una connessione SMB fatta senza fornire credenziali (username e password). In pratica, l'attaccante si autentica come utente anonimo. Su alcuni sistemi Windows più vecchi (come **Windows NT e 2000**), questa connessione anonima consente comunque di accedere a molte informazioni di sistema.

**Null Session Against Win 2000**
![[2Semester/ETH/Images/45.png]]

**Information Available**
Null sessions on Win 2000 and NT provide information about:
- Shares
- User accounts
- Password policies

#### DumpSec – free tool
```ad-abstract
title: Definition

==DumpSec== is a security tool that generates detailed reports on system users, file systems, registry, permissions, password policies, and services, aiding in security audits and vulnerability assessments
```

![[2Semester/ETH/Images/46.png]]

#### Registry Enumeration
The Registry can be viewed remotely with reg (MS built-in) or DumpSec. This requires Administrator privileges by default on Windows servers - you can NOT do it with null sessions. 

![[2Semester/ETH/Images/47.png]]

#### Security Identifier (SID)
I **SID (Security Identifier)** servono in Windows per **identificare in modo univoco** utenti, gruppi e altri soggetti di sicurezza (security principals).
-  S-1-5-21-1180699209-877415012- 3182924384-1004
-  Relative Identifier (RID)

![[2Semester/ETH/Images/48.png]]

>Changing the last 3 numbers of another account's SID to 500 for Admin.

#### User Enum - user2sid/sid2user
Queste utilità possono ottenere nomi di account utente e SID da remoto, anche bloccando le connessioni anonime (la chiave di registro RestrictAnonymous è impostata su 1). Possono trovare il nome dell'account dell'amministratore, anche se rinominato. Funziona con i sistemi operativi della famiglia NT, ma non con Win XP SP2.

![[2Semester/ETH/Images/49.png]]

#### All-in-One Null Session Enumeration Tools
- `Winfingerprint`
- `Through Active Directory and WMI`
-  `Winfo`
- `NBTEnum 3.3`

![[2Semester/ETH/Images/50.png]]

#### SMB Null Session Countermeasures
**Block TCP 139 and 445 at the network perimeter.** 
Set the RestrictAnonymous registry key to 1 (or 2 on Win 2000 and later) using regedt32. The key is located at HKLM\SYSTEM\CurrentControlSet\Control\LSA. This can be bypassed by querying NetUserGetInfo API call at Level 3 - tools like NBTEnum and Userinfo bypass it. Anonymous Access settings do not apply to remote Registry access, so ensure the Registry is locked down (reference: [http://support.microsoft.com/kb/153183](http://support.microsoft.com/kb/153183)). Finally, audit yourself with dumpsec.

### Simple Network Management Protocol (SNMP, UDP 161)
==SNMP== is intended for network management and monitoring It provides inside information on network, devices, software and systems.

> Administrators use SNMP to remotely manage routers and other network devices

#### Community Strings
SNMP has a minimal **security system** called ==SNMP Community Strings==. Community strings act like passwords. There are three kinds of SNMP Community strings: 
- **Read-Only**, 
- **Read-Write**,
- **Trap** (Trap is rarely used).

But the community strings are often left at obvious defaults like 'public' and 'private'. 
Attackers often use **Wireshark** to obtain the community string by packet inspection.

#### Management Information Bases (MIBs)
The ==MIB== contains a **SNMP device's data in a tree-structured form**. 
Vendors add data to the MIB. Microsoft stores Windows user account names in the MIB.

![[Pasted image 20250518180459.png]]

#### Data Available Via SNMP Enumeration
- Running services
- Share names
- Share paths
- Comments on shares
- Usernames
- Domain name

#### SNMP Enumeration Tools
- `snmputil` from the Windows NT Resource Kit
- `snmpget` or snmpwalk for Linux (netsnmp suite)
- `IP Network Browser` graphical tool by Solarwinds

![[2Semester/ETH/Images/51.png]]


```ad-danger

Attackers who guess the SNMP community string may be able to remotely control your network devices!
```

#### SNMP Enumeration Countermeasures
Remove or disable unneeded SNMP agents. 
Change the community strings to non-default values.
Block access to TCP and UDP ports 161 (SNMP GET/SET) at the network perimeter devices. Restrict access to SNMP agents to the appropriate management console IP address.
Use SNMP V3—much more secure than V1 or 2—as it provides enhanced encryption and authentication mechanisms. Adjust Win NT registry keys to make SNMP less dangerous.

## BGP, TCP 179
Border Gateway Protocol (BGP) is the de facto routing protocol among Autonomous Systems
-  Organizations with more uplinks use BGP
- Use AS-Number to guide packets to their destinations.
-  ASN: unique IP-like for a large organization
- BGP can be used to enumerate all the networks of a particular corporation (AS-Number)
-  That may give more targets to attack
- No countermeasure, BGP cannot be blocked

### Windows Active Directory LDAP TCP/UDP 389 and 3268
- **Active Directory (AD)** è il sistema di gestione centralizzata delle identità e risorse nei domini Windows. Contiene:
    - Utenti
    - Gruppi
    - Computer
    - Policy di sicurezza
- **LDAP (Lightweight Directory Access Protocol)** è il protocollo standard con cui si interroga e si modifica un directory service come Active Directory.

### Active Directory Enumeration Countermeasures
- **TCP/UDP 389** → LDAP standard
- **TCP 3268** → Global Catalog (LDAP su Global Catalog per cercare oggetti in tutta la foresta AD)

L’**enumerazione LDAP** permette a un attaccante di raccogliere informazioni su utenti, gruppi e altre risorse presenti nell’AD **senza autenticazione completa**, se le configurazioni sono deboli.

Un esempio di tool Microsoft per l’enumerazione LDAP è:
- **ldp.exe** → Un client LDAP GUI incluso in Windows Server. Permette di:
    - Eseguire query LDAP
    - Esplorare l’intero schema e i contenuti di AD
    - Verificare permessi