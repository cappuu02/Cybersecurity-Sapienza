# Scanning
The scanning phase in a cybersecurity activity (such as a penetration test or network assessment) is used to gather information about devices within a network.

1. Determining if the ==system is alive== 
2. Determining which ==services are running== or listening 
3. Detecting the ==operating system== 
4. ==Processing== and ==storing== scan data

## 1) Determinating if the system is alive
### Network ping sweeps 
- ==ARP host discovery:== permette di scoprire chi è collegato alla stessa rete locale.
	- **Arp-scan**: run as root by sudo to list IP-MAC 
	- **Nmap** (Network Mapper): host and service discovery with various options (host only: -PR –sn) 
	- **Cain** (Windows-only): beyond host and service discovery

> ARP serve per tradurre gli indirizzi IP in indirizzi MAC (livello 3 ➝ livello 2). Funziona solo all'interno della stessa rete locale (subnet).

#### Address Resolution Protocol (ARP)
```ad-example
![[ETH/Images/1.png]]

```

#### Nmap
`Nmap –sn –PR –send-IP <IP-range>` Is the easiest way to pinging. 
NMAP not only sends an ICMP ECHO REQUEST packet it also performs an ARP ping, some TCP pinging. Understanding what tools do, is really important. If the target network is being monitored by an IDS, you may inadvertently trigger an alert because of all of the extra traffic being generated.

>`-Pn` option probes only port 22, `-sn` to probe ports, `-Pe` skip ARP resolution

### ICMP host discovery: remote host/router
- ICMP è il protocollo usato da comandi come `ping`.
- I pacchetti più usati:
    - `ECHO REQUEST` (richiesta ping)
    - `ECHO REPLY` (risposta ping)
    - `TIMESTAMP`, `ADDRESS MASK` (altri tipi meno comuni)

**Strumenti**
- **Ping**: comando classico per verificare se un host risponde.
- **Nmap**: fa più tipi di ping, non solo ICMP ma anche ARP, TCP.
- **Hping3 / nping**: strumenti avanzati che permettono di **modificare pacchetti**, **spoofare** IP/MAC, e inviare varie combinazioni di protocolli.
- **Superscan**: invia più tipi di pacchetti ICMP in parallelo per accelerare la scansione.

![[ETH/Images/2.png]]
![[ETH/Images/3.png]]

### TCP/UDP host discovery
Se i **pacchetti ICMP sono bloccati** (es. da un firewall), allora si prova a scoprire i sistemi usando pacchetti TCP o UDP:
- **Servers**: TCP/UDP service ports 
- **Desktops**: local firewall to ban inbound connections, but accessible through remote desktop, file sharing, and disabled local firewall 
- **Nmap/Superscan/Nping**: all ports (slow and noisy) or specific ports 

### Ping Sweeps Countermeasures
==Detection== 
- **IDS** (Intrusion Detection System) like `Snort`
- **Commercial firewall**: network or desktop (Detect ICMP, TCP, UDP ping sweeps)
- **Host based tools**: Scanlogd, courtney, ippl, protolog 
- Through human eyes. 

==Prevention== 
- **ACL (Access Control List) in firewall**: limit ICMP traffic into your networks or systems 
- Consenti ICMP solo da IP fidati, come quelli del tuo ISP.
	- **Loki2**: strumento usato da hacker per creare un **canale nascosto (covert channel)** nei pacchetti ICMP ECHO, per esfiltrare dati o aprire backdoor.
	- **Pingd**: sposta la gestione dell’ICMP **dal kernel allo user space**, permettendo maggiore controllo e sicurezza.

### 3-way handshake
![[ETH/Images/4.png]]


### TCP Header
![[ETH/Images/5.png]]

with flag:
![[ETH/Images/6.png]]

## 2) Determining Which Services Are Running or Listening
Questo passaggio fa parte della fase di **ricognizione attiva** durante un test di penetrazione o attività di ethical hacking. L'obiettivo è capire:
1. **Servizi** in esecuzione sulla macchina bersaglio
2. Quali **porte** TCP o UDP sono aperte (in ascolto)
3. Quale **OS** o **versione** è in uso nel sistema target

### Port Scanning
 1. **Identifying TCP/UDP services**
	- Si scansionano le porte TCP e/o UDP.
	- Ogni servizio usa una porta: ad esempio, HTTP spesso usa la porta 80, SSH la 22, ecc.
	- Se la porta è aperta, il servizio è in ascolto.

2. **Identifying OS**
	- Alcune risposte ai pacchetti (come i flag TCP) possono rivelare che tipo di sistema operativo sta rispondendo (Windows, Linux, ecc.).
	- Questo si chiama **OS fingerprinting**.

3. **Identifying applications or versions**
	- Una volta trovata una porta aperta, si può interrogare il servizio per sapere quale **software** è in esecuzione e **quale versione**.

### Tipi di scansione TCP (usano pacchetti TCP "anomali" o particolari)

#### 🟢 **TCP Connect Scan**
- È il più semplice: si effettua l'intero **3-way handshake** (SYN → SYN/ACK → ACK).
- Se riesce, significa che la porta è aperta.
- Viene **registrato nei log** del server.

#### 🟡 **TCP SYN Scan 
- Invia un pacchetto **SYN** e aspetta la risposta:
    - Se riceve **SYN/ACK**, la porta è **aperta**.
    - Se riceve **RST**, è **chiusa**.
- Non completa il 3-way handshake → più **furtivo** (meno facile da rilevare).
- Molto usato da strumenti come **Nmap**.

#### 🔴 **TCP FIN Scan**
- Invia un pacchetto con il flag **FIN**:
    - Se la porta è **chiusa**, il sistema risponde con **RST**.
    - Se la porta è **aperta**, **non risponde**.
- Funziona solo su alcuni sistemi (non Windows).

#### 🔴 **TCP Xmas Tree Scan**
- Pacchetto con i flag **FIN**, **URG**, **PUSH** accesi (sembra un "albero di Natale").
- Comportamento simile alla FIN scan. 
- Molto anomalo: può far emergere falle nei sistemi di difesa o stack TCP non ben configurati.

#### 🔴 **TCP Null Scan**
- Pacchetto **senza alcun flag** TCP.
- Anche qui: nessuna risposta = porta aperta; RST = porta chiusa.
- Serve per confondere o eludere firewall.    

#### ⚙️ **TCP ACK Scan**
- Invia pacchetti con solo il flag **ACK**.
- Non serve a scoprire se una porta è aperta, ma se è **filtrata** o meno (ad esempio da un firewall).
- Analizza il **comportamento del firewall**.

#### ⚙️ **TCP Window Scan**
- Variante dell'ACK scan che osserva il **campo "window size"** nella risposta ACK.
- Alcuni sistemi rivelano porte aperte/chiuse in modo inconsapevole in questo modo.

#### 📡 **TCP RPC Scan**
- Serve a rilevare porte associate a **Remote Procedure Call** (RPC).
- Utili per analizzare macchine con servizi RPC (es. NFS, servizi Microsoft).

### UDP Scan
- UDP è senza connessione, quindi funziona diversamente dal TCP.
- Se la porta è **chiusa**, spesso il sistema risponde con un pacchetto **ICMP Port Unreachable**.
- Se **non ricevi risposta**, può voler dire che la porta è **aperta** o **filtrata**.
- Meno affidabile, ma importante per scoprire servizi DNS, SNMP, ecc.

```ad-example

![[2Semester/ETH/Images/37.png]]
```


## 3) Detecting The Operating System
Useful info for vulnerability mapping 
- **Banner grabbing**: Quando ti connetti a un servizio (es. FTP, HTTP, SMTP), spesso il server ti dice subito chi è!
- **Scanning available ports**: some services are OS specific! 
- **Stack fingerprinting**: TCP/IP stack implementation

Making guess from available ports 
- ==Windows==: ports **135**, **139**, **445** (139 only for Windows 95/98); 3389 for RDP (Remote Desktop Protocol) 
- ==UNIX==: TCP **22** (SSH), TCP **111** (RPC portmapper=port 135), TCP **512-514** (Berkeley Remote services, rlogin), TCP **2049** (NFS, Network File System), high number ports 3277x (RPC, Remote Procedure Call in Solaris)

#### Port 135, 139, 445
- ==Port 135== Microsoft EPMAP, end-point mapper. Microsoft relies upon DCE RPC to remotely manage services. Some services that use port 135 of end-point mapping are: DHCP server, DNS server, WINS server 
- ==Port 139== NetBIOS 
- ==Port 445== MS Server Message Block (SMB), SAMBA-compatible


### Active Operating System Detection
```ad-abstract
title: Active Operating System Detection
Tecnica usata da strumenti come **Nmap** per determinare con precisione il sistema operativo (OS) di un host remoto. Viene chiamata "attiva" perché invia pacchetti **artificiali** e analizza le **risposte anomale** per dedurre informazioni sull’OS.

```

Lo strumento più comune per fare ciò: `nmap -O <ip>`.
**riassunto delle tecniche** che **Nmap utilizza internamente** per cercare di identificare il sistema operativo **quando esegui `nmap -O <ip>`**. In generale Nmap usa la maggior parte di queste tecniche contemporaneamente quando avvio il comando, ma non sempre li usa tutti, solo quelli rilevanti e possibili in base a stato delle porte, permessi, firewall.....

#### ✅ **FIN Probe**
- Invia un pacchetto TCP con solo il flag **FIN**.
- Alcuni OS (es. **Windows 7, Vista, Server 200x**) rispondono con **FIN/ACK** anche su porte chiuse → comportamento specifico che li distingue.

#### 🚩 **Bogus Flag Probe**
- Invia un pacchetto con **flag TCP non validi** o non usati.
- Es: Linux potrebbe rispondere **ripetendo lo stesso flag sconosciuto**, mentre altri OS lo ignorano → utile per identificare Linux.

#### 🔢 **Initial Sequence Number (ISN) Sampling**
- Ogni pacchetto SYN/SYN-ACK ha un **numero di sequenza iniziale**
- Alcuni sistemi generano questi numeri in modo **prevedibile**, altri no.
- Nmap analizza il pattern per determinare l’OS (es: sequenze incrementali → vecchi OS)    

#### 📦 **“Don’t Fragment” (DF) Bit Monitoring**
- Alcuni sistemi impostano il flag **DF (Don’t Fragment)** nei pacchetti IP.
- Questo comportamento varia da OS a OS.

#### 📐 **TCP Initial Window Size**
- Quando un host risponde, invia un valore chiamato **window size** (buffer).
- Alcuni OS usano valori specifici (es: Windows 65535, Linux 5840, ecc.).

#### 🔄 **ACK Value**
- Nmap guarda il valore ACK che riceve dopo aver inviato un certo valore di SEQ.
- Alcuni sistemi rispondono con `ACK = SEQ + 1`, altri con `ACK = SEQ + 0`, ecc.

#### ⚠️ **ICMP Message Quenching**
- Secondo la RFC 1812, un sistema deve limitare il numero di messaggi di errore ICMP al secondo.
- Nmap manda molti pacchetti errati per vedere **se e come vengono limitati**.

#### 🔁 **ICMP Message Quoting**
- Quando un sistema invia un errore ICMP, di solito "cita" (include) una parte del pacchetto originale.
- Alcuni OS includono **8 byte**, altri di più → differenza utile per l’identificazione.

#### 🧪 **ICMP Echo Integrity**
- Verifica **quanto cambia** l’intestazione IP originale nei pacchetti ICMP di risposta.
- Alcuni OS modificano certi campi (come TTL, ID pacchetto), altri li lasciano intatti.

#### 🏷️ **Type of Service (ToS)**
- Alcuni OS impostano il campo **ToS** nell’header IP a valori diversi da zero.
- Questa piccola variazione può aiutare ad identificare l’OS.

#### 🧩 **Fragmentation Handling**
- Invia pacchetti IP **frammentati** per vedere come l’host li riassembla.
- OS diversi gestiscono la frammentazione in modi diversi.

#### ⚙️ **TCP Options**
- Opzioni come **MSS**, **SACK**, **Timestamps** vengono analizzate.
- Alcuni OS attivano certe opzioni, altri no, o le impostano con valori specifici.

![[ETH/Images/7.png]]

**Countermeasures**
==Detection== 
Si può **rilevare un tentativo di fingerprinting** monitorando il traffico di rete anomalo:
- **Opzioni TCP sospette**: alcuni strumenti come **Nmap** usano pacchetti con flag strani (es. FIN, URG, PUSH insieme) per analizzare la risposta.
- Strumenti: 
	- `Snort` per rilevare intrusioni e pacchetti malformati.
	- `Scanlogd, Ippl, Courtney`: strumenti che loggano e notificano tentativi di scansione o fingerprinting


==Prevention== 
- Change unique stack characteristic (not recommended) 
- secure proxy or firewall, Active Defence

### TCP/IP Stack Fingerprint
Ogni sistema operativo implementa **in modo leggermente diverso** lo **stack TCP/IP**, cioè il "motore" che gestisce la comunicazione in rete.
Queste **differenze nei dettagli tecnici** possono essere osservate e analizzate per determinare quale OS è in uso su una macchina. Questo processo è detto **fingerprinting**.

The TCP/IP fields that may vary include the following: 
- Initial packet size (16 bits) 
- Initial TTL (8 bits) 
- Window size (16 bits) 
- Max segment size (16 bits) 
- Window scaling value (8 bits) 
- "don't fragment" flag (1 bit) 
- "sackOK" flag (1 bit) 
- "nop" flag (1 bit) 

Combinando questi campi (in totale **67 bit**), si ottiene una **firma unica** che può essere confrontata con un database di firme note (come quello di **Nmap**).

### Passive Operating System Detection
Il **rilevamento passivo** del sistema operativo è una tecnica **più discreta** rispetto a quella attiva, perché **non invia pacchetti** al sistema bersaglio. Si limita a **osservare** il traffico di rete esistente, rendendolo **stealth** (difficile da rilevare) anche da parte di **sistemi di rilevamento intrusioni (IDS)**.

Si basa su **passive stack fingerprinting**, cioè il riconoscimento del sistema operativo **analizzando i pacchetti TCP/IP** ricevuti. Questo può avvenire:
- In una **postazione centrale** nella rete
- Su una **porta in ascolto** configurata per **packet capture**, ad esempio usando lo **port mirroring** su uno switch
Uno strumento utile: **Siphon**, permette il **port mapping passivo**, identificazione dell’OS e anche la mappatura della topologia di rete.


Il ==metodo può fallire== nei seguenti casi:
1. Applicazioni che generano manualmente i pacchetti (bypassano lo stack TCP/IP)
2. Impossibilità di catturare i pacchetti, per esempio se non si ha accesso a un punto strategico nella rete
3. Il sistema remoto cambia dinamicamente i parametri della connessione (problema comune anche per il rilevamento attivo)

==Countermeasure==
Sono le **stesse** previste per il rilevamento attivo:
- Utilizzo di **firewall** e **proxy sicuri**
- **Strumenti di rilevamento intrusioni (IDS)** come Snort
- **Difese attive** contro tentativi di scansione e fingerprinting
- Minimizzare le informazioni tecniche nei pacchetti TCP/IP in uscita

![[ETH/Images/8.png]]
![[ETH/Images/9.png]]

## 4) Processing and Storing Scan Data
**Efficienza nella gestione dei dati di scansione** → **velocità nell'attaccare un gran numero di sistemi**
Metasploit è una piattaforma potente che include **strumenti**, **payload** ed **exploit** per testare la sicurezza dei sistemi e lanciare attacchi. Una delle sue caratteristiche più utili è la gestione e l'analisi dei dati di scansione, che può essere utilizzata per velocizzare la compromissione di un ampio numero di sistemi.
- Metasploit utilizza **PostgreSQL** come database per gestire e archiviare i dati delle scansioni e degli attacchi.
- **db_connect**: tells metasploit how to connect to database and which database to use `msf > db connect postgres:<password>@localhost: <port>/msf3 `
- **db_nmap** (root required): run Nmap scans 
	- Metasploit could scan but slower than Nmap
- **db_import**: import Nmap results into database, commands: 
	- **hosts**: show hosts and their OS 
	- **services**: show all available ports and services 
	- **Filtering** (-s) to see, e.g., all hosts with SSH or running Windows 2008 

![[ETH/Images/10.png]]
![[ETH/Images/11.png]]
![[ETH/Images/12.png]]
![[ETH/Images/13.png]]
