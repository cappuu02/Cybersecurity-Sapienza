
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

## Usability goals
**_Transparency_** (something that does not impact on the software that we use)
- VPN should be invisible to users, software, hardware.
**_Flexibility_** 
-  VPN can be used between users, applications, hosts, sites.
**_Simplicity_**
- VPN can be actually used

From the point of view of the VPN we introduce the concept of protection between different elements of the internets.


## Site-to-site security
Internet = insecure network
We want to create another net that can protect our traffic.
>Emulate net on top of the internet to emulate a connection between two hosts.

![[2Semester/PND/images PND/159.png]]


## Host-to-site security
![[2Semester/PND/images PND/160.png]]

>ACME configuration
## Host-to-host security
![[2Semester/PND/images PND/161.png]]

>Protezione tra due siti oppure tra host e sito oppure tra due host!

## Physical layer
Encryption at the physical layer (Before send data we perform an enc in the physical layer)
Remember: point to point connection on phy layer!
![[2Semester/PND/images PND/162.png]]

## Datalink layer: protect a single link
In the data link layer we are protected a single layer like for example the ethernet.
![[2Semester/PND/images PND/163.png]]

If we ENC at data link layer we are protecting everything that is inside the ethernet (IP, IP header, TCP header and application data)

- Confidentiality: on link (”virtualcable”)
- Integrity: on link
- Authentication: none
- Replay protection: none
- Traffic analysis protection: on link
- Access control: physical access
- Transparency: full transparency
- Flexibility: can be hard to add new sites 
- Simplicity: excellent!

>Protezione a livello di layer $\to$ appena usciamo dal layer la protezione non è più presente
## Network layer: protect end-to-end between systems
![[2Semester/PND/images PND/164.png]]
We are protected all inside the network layer. Protection that we gave with ipsec.
This is the best solution to adopt.

- Confidentiality: between hosts/sites 
- Integrity: between hosts/sites
- Authentication: for host or site

>Packets that we are sending should be actually dec  only between src-dest. We need a way to establish many keys every single pairs of hosts in the internet $\to$ most challenges thing that we have in VPN (for confidentiality, integrity and authentication)

- Replay protection: between hosts/sites
- Traffic analysis protection: host/site information exposed
- Access control: to host/site
- Transparency user and SW transparency possible
- Flexibility: may need HW or SW modifications
-  Simplicity: good for site-to-site, not good for host-to-site

## Transport layer: Protection end-to-end between processes
Here network layer is not anymore protected $\to$ here we protect the transport layer
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
If we enc here it is not a real VPN.
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
- **_Transport layer_**
-  **_Network layer_**
These are the most popular choices for VPNs. Other options:
- Secure Application layer protocols: only protect a single application, but are often used for specialized purposes, e.g. S/MIME or PGP for secure e-mail
- Secure Data Link layer protocols: are mostly used with PPP or other modem- based communication. e.g. PPTP, L2TP, LTF

## Tunneling
```ad-abstract
title: Definition

Operation of a network connection on top of another network connection.
It allows two hosts or sites to communicate through another network, thanks to a "tunnel" that they do not want to use directly. It's a method of passing a network connection inside another network connection.
```

>Tunnel has two different endpoints

>Concetto che permette al nostro meccanismo di funzionare $\to$ molto ad alto livello.

![[2Semester/PND/images PND/167.png]]

### Site-to-site tunneling
Enables a PDU to be transported from one site to another without its contents being processed by hosts on the route.

==Idea==: **Encapsulate** the whole PDU (protocol data unit) in another PDU sent out on the network connecting the two sites.
-  Encapsulation takes place in edge router on src. site.
-  Decapsulation takes place in edge router on dst. site.

>Note that the host-to-host communication does not need to use IP

![[2Semester/PND/images PND/168.png]]
### Secure tunneling
If we use an encryption protocol, we can protect our content. (secure tunnel = VPN)
![[2Semester/PND/images PND/169.png]]

>In the visible green IP hdr. we don't see the real source and destination (We protect the real src/dst)

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
Where we place the two different endpoints for creating vpn tunnel? 
The choice of the starting and finishing point of the tunnel is fundamental.
## SSL VPN Device placement
La posizione del dispositivo VPN ha un impatto diretto su:
-  Security
-  Functionality
- Performance

Main options for placement:
- VPN functionality in firewall
- VPN device in internal network
- Single-interface VPN device in DMZ
- Dual-interface VPN device in DMZ

>Remember: Cryptographic protection only extends from VPN client systems to the SSL VPN device.

## Firewall with an SSL VPN
![[2Semester/PND/images PND/172.png|500]]

## VPN-enabled firewall
In questa configurazione, il **firewall svolge anche la funzione di dispositivo VPN**: il tunnel VPN finisce direttamente sul firewall, che poi comunica con la rete interna.

- **_Advantages_**
	- No holes in FW between external VPN device and internal network.
	- Traffic between device and internal network must go through FW.
	- Simple network administration since only one “box” to administer.
- **_Disadvantages_**
	- Limited to VPN functionality offered by FW vendor.
	- FW directly accessible to external users via port 443.
	- Adding VPN functionality to FW can introduce vulnerabilities.

> Note: TCP port 443 (standard) must be open on external FW interface, so clients can initiate connections

## SSL VPN in internal network

We make traffic come from internet to reach vpn gateway
![[2Semester/PND/images PND/173.png|500]]
### VPN internal
**_Advantages_**
-  Only single rule for single address to be added to FW.
- No “holes” needed in FW between VPN device and internal network.
- VPN traffic is behind FW, so protected from attacks by machines in DMZ.
**_Disadvantages_**
-  VPN traffic passes through FW on tunnel, so it is not analyzed.
-  Unsolicited traffic can be sent into internal network from outside to internal VPN device.
-  Internal network is compromised if VPN device is compromised.

>Note: TCP port 443 (standard) opened on FW for the address of the device.

## SSL VPN In DMZ
![[2Semester/PND/images PND/174.png]]

### DMZ with VPN
**_Advantages_**
- Internal network protected against compromised VPN device.
- Traffic between device and internal network must go through FW.
- IDS in DMZ can analyze traffic destined for internal network.
**_Disadvantages_**
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
- If implemented on boundary routers (or proxies), can provide a tunnel between two sites (typically LANs)
- Placed on top of TCP, so no need to change TCP/IP stack or OS.
-  Provides secure channel (byte stream)
	- Any TCP-based protocol
	-  https:// URIs, port 443
	- NNTP, SIP, SMTP...
- Optional server authentication with public key certificates
	- Common on commercial sites


```ad-success
title: Important
==TLS (Transport Layer Security)== è un protocollo che **aggiunge crittografia e autenticazione** sopra TCP.
    
Quando diciamo che "TLS fornisce un canale sicuro come TCP", intendiamo che:
- **Mantiene l'affidabilità del trasporto**, come fa TCP (ordinamento, ritrasmissioni, controllo di flusso),
        
- **Ma in più cifra e autentica** i dati trasmessi, proteggendoli da intercettazioni e manomissioni.

```


## How HTTPS (HTTP on top of TLS) works
Before HTTP connection a TLS handshake has been done.
Digital certificate is in cleartext and contains:
- Public Key
- digital signatur of CA on top of certificate (validate the correctness PK)
Use a key to to do symmetric cryptography.

![[2Semester/PND/images PND/176.png]]


## SSL protocol Architecture
SSL si inserisce **tra il livello di trasporto (TCP)** e il livello applicativo, aggiungendo **sicurezza**.

**_Record Protocol_**: Protocol offering basic _encryption_ and _integrity_ services to applications
**_Application Protocols_**: Controlla e gestisce la sicurezza con tre sottoprotocolli
- _Handshake_: Used to authenticate server (and optionally client) and to agree on encryption keys and algorithms.
- _Change cipher spec_: Selects agreed keys and encryption algorithm until further notice.
- _Alert_: Transfers information about failures.

![[2Semester/PND/images PND/177.png]]

## TLS Record protocol operation
![[2Semester/PND/images PND/178.png]]

## Handshake protocol exchange
```ad-abstract
title: Definition Handshake
Il **TLS Handshake** è il processo di **negoziazione e autenticazione** che avvia una connessione sicura tra client e server.

```

![[2Semester/PND/images PND/179.png]]

4-phase “Client/Server” protocol to establish parameters of the secure connection (“Client” is the initiator):
1) Hello: Establishment of security capabilities: Client sends list of possibilities, in order of preference. Server selects one, and informs Client of its choice. Parties also exchange random noise for use in key generation.
2) Server authentication and key exchange: Server executes selected key exchange protocol (if needed). Server sends authentication info. (e.g. X.509 cert.) to Client.
3) Client authentication and key exchange: Client executes selected key exchange protocol (mandatory). Client sends authentication info. to Server (optional).
4) Finish: Shared secret key is derived from pre-secrets exch. in 2, 3. Change Cipher Spec. protocol is activated. Summaries of progress of Handshake Protocol are exchanged and checked by both parties.

## Can we trust a public key?
MITM can substitute real key!
![[2Semester/PND/images PND/180.png]]
Il client chiede al server la sua chiave pubblica per cifrare i dati, ma un attaccante **Man-in-the-Middle (MITM)** intercetta la richiesta e **sostituisce la vera chiave con la propria**. Così, il client invia i dati cifrati all’attaccante, che li può leggere, ricifrare con la vera chiave del server e inoltrare. La comunicazione avviene, ma **l’attaccante può spiare o manipolare i dati**.

```ad-warning
title: Important
Anche se la **cifratura asimmetrica** è usata, **non basta conoscere una chiave pubblica**: bisogna **fidarsi che quella chiave appartenga davvero al soggetto corretto**.

```

```ad-success
title: Solution
Utilizzare i Certificati Digitali.

```

## Digital certificates
```ad-abstract
title: Definition
Un ==certificato digitale== è un documento elettronico che lega una chiave pubblica alla sua identità (cioè al proprietario), in modo affidabile.

```

How it works?
1. Un ente chiamato **Certification Authority (CA)** verifica l'identità di qualcuno (es. un sito web).
2. Dopo la verifica, la CA **firma digitalmente un certificato**, che contiene:
	- Il **nome del proprietario**
	- La **chiave pubblica**
	- La **firma digitale della CA**

Quando ricevi un certificato (es. da un sito HTTPS), il tuo browser:
- **Verifica la firma** usando la **chiave pubblica della CA**, già presente tra le chiavi fidate del sistema.
- Se la firma è valida, **può fidarsi** che quella chiave pubblica appartiene davvero al sito che stai visitando.

```ad-info
title: “Come posso fidarmi di una chiave pubblica?” 
 
👉 Se è **certificata da una CA fidata**, puoi fidarti!

```

## Public key certificate use (IMPORTANT FOR EXAM)
![[2Semester/PND/images PND/181.png]]

### Fase 1: Creazione del certificato digitale firmato
- Si parte da un **certificato non firmato**, che contiene:
    - L’**ID dell’utente** (es. “Bob”)
        - La sua **chiave pubblica**
        - Informazioni sulla **CA** che lo certifica
- **Hash (H)**
    - Si calcola un **digest** del contenuto del certificato con una **funzione hash** (es. SHA-256).
    - Questo hash è **univoco** per quel contenuto.
- **Firma digitale (E)**
    - L’hash viene **crittografato con la chiave privata della CA**.
    - Questo crea la **firma digitale**.
- **Risultato finale: certificato firmato**
    - Il certificato + la firma digitale = **certificato digitale firmato**
    - Ora possiamo distribuirlo in modo che altri possano **verificare che sia autentico**.

### Fase 2: Verifica del certificato da parte del destinatario
- **Ricezione del certificato firmato**
    - Il destinatario riceve il certificato firmato, che contiene:
        - I dati di Bob (chiave pubblica, ID…)
        - La firma digitale
- **Ricalcolo dell’hash (H)**
    - Il destinatario calcola **di nuovo l’hash** dei dati del certificato ricevuto (escludendo la firma).
- **Verifica della firma (D)**
    - Prende la firma e la **decifra con la chiave pubblica della CA**.
    - Il risultato è l’hash originale creato dalla CA.
- **Confronto**
    - Se l’hash decifrato (quello originale) **coincide** con l’hash ricalcolato dal destinatario:  
        ✅ Il certificato è **autentico**  
        ✅ La chiave pubblica appartiene davvero a Bob

## Certification Authority (CA)
Organizzazione fidata che ha il compito di collegare in modo affidabile un'entita ad una chiave pubblica rilasciando un certificato digitale firmato.


The CA performs many tasks:
- **Riceve richieste** di certificati digitali da utenti, aziende o siti.
- **Verifica l’identità** del richiedente
- **Genera o riceve le chiavi**:
	- In alcuni casi genera le chiavi pubblica/privata per l’utente.
    - In altri, l’utente fornisce la propria chiave pubblica.
- **Firma il certificato**: la CA calcola un hash del certificato e lo **firma con la sua chiave privata**.
- **Salva e protegge** i certificati emessi, e li rende disponibili.
- **Revoca certificati** compromessi o scaduti, aggiornando la **CRL (Certificate Revocation List)**.

```ad-info
I certificati delle CA **radice (root)** più importanti sono **preinstallati** su ogni sistema operativo o browser moderno (Windows, macOS, Firefox, Chrome…).  
Quindi il nostro computer **si fida automaticamente** di ciò che è firmato da queste CA.

```


## PKI: Public Key Infrastructure
La **PKI (Public Key Infrastructure)** è un **insieme di tecnologie, ruoli, politiche e procedure** usate per:
- **Gestire** (creare, distribuire, conservare)
- **Verificare**
- **Revocare** i **certificati digitali** che associano una chiave pubblica a un’identità.

Gerarchia:
1. **_Root CA_**: al vertice, il suo certificato è autofirmato.
2. **_Intermediate CA_**: riceve un certificato firmato dalla root. Firma i certificati per utenti o altre CA
3. **_End-Entity_**: È il certificato dell'utente o server (es: un sito web HTTPS).

![[2Semester/PND/images PND/182.png]]



## X.509
X.509, definito nel RFC 5280, è il formato più diffuso per i certificati a chiave pubblica.

I certificati X.509 vengono usati per garantire la sicurezza in molte applicazioni di rete, come:
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

```ad-example

Example: TLS_RSA_WITH_AES_128_CBC_SHA
-  TLS (Latest version of) TLS→
- RSA RSA key exchange→
- WITH (merely filler...)→
- AES_128 128-bit AES encryption→
- CBC Cipher Block Chaining→
- SHA Use HMAC-SHA digest
```


## Key exchange and authentication 
Possible ways of agreeing on secrets in TLS are:
- RSA: RSA key exch. (secret encrypted with recipient’s publ. key)
- DHE RSA: Ephemeral Diffie-Hellman with RSA signatures
-  DHE DSS: Ephemeral Diffie-Hellman with DSS signatures
- DH DSS: Diffie-Hellman with DSS certificates
- DH RSA: Diffie-Hellman with RSA certificates
- DH anon: Anonymous Diffie-Hellman (no authentication)
- NULL No key exch.

```ad-success
title: Important
“Key exchange” only establishes a pre-secret! From this, a master secret is derived by a pseudo  random function (PRF). Shared secret encryption key is derived by expansion of master secret with another PRF. (In TLS several keys are derived for different purposes.)
```


## SSL Master Secret
![[2Semester/PND/images PND/185.png]]

How the key is determine? 

## TLS Master Secret
![[2Semester/PND/images PND/186.png]]

## SSL/TLS Heartbeat

### Scambio Heartbeat
Un endpoint invia un HeartbeatRequest e attiva un timer di ritrasmissione; durante questo intervallo non invia altre richieste. Se non arriva una HeartbeatResponse entro il tempo previsto, la sessione si considera terminata.

### Payload Heartbeat
Per evitare attacchi di replay, il messaggio HeartbeatRequest contiene un payload che deve essere restituito invariato nel messaggio di risposta.


## SSL VPN Architecture
Esistono due modelli principali di SSL VPN:

==SSL Portal VPN== : Accesso remoto a servizi web ospitati sul gateway tramite browser.
==SSL Tunnel VPN==: Accesso remoto a servizi di rete protetti dal gateway, con più funzionalità rispetto al Portal VPN.

## SSL VPN funzionalità
Le SSL VPN offrono generalmente una o più di queste funzioni:
- **Proxying**  
    Il dispositivo fa da intermediario, apparendo come server reale al client.
- **Application translation**  
    Converte i protocolli, permettendo ad esempio ai Portal VPN di far accedere applicazioni non web tramite browser.
- **Network extension**  
    Fornisce accesso parziale o totale alla rete aziendale agli utenti remoti, tipicamente tramite Tunnel VPN.

# IPSec
```ad-abstract
title: Definition
==IPSec== è una suite di protocolli a livello di rete per garantire la sicurezza sulle comunicazioni IP.

È integrato in IPv6 e disponibile come estensione per IPv4.

```

Supporta tre modalità di sicurezza principali:
- **_Confidentiality_** (crittografia)
- **_Integrity_** (integrità dati)
- **_Authentication_** (autenticazione)

## IPsec services
IPsec offre tre servizi principali tramite protocolli distinti:
- **Authentication Header (AH):** garantisce integrità e autenticazione dei pacchetti IP.
- **Encapsulated Security Payload (ESP):** fornisce crittografia e, opzionalmente, autenticazione.
- **Internet Key Exchange (IKE):** gestisce lo scambio e la gestione delle chiavi di sicurezza.

## IPsec Security Associations
Una Security Association (SA) è come una “connessione” IPsec che definisce tutti i parametri necessari per la comunicazione sicura, come algoritmi crittografici (AES, SHA1), modalità operative (CBC, HMAC), lunghezza delle chiavi e traffico protetto.

- Entrambe le parti devono accordarsi sulla SA per comunicare in sicurezza.
- Per comunicazioni bidirezionali servono due SA, una per ogni direzione.
- I parametri della SA vengono negoziati tramite IKE prima di iniziare la comunicazione.

Ogni SA è identificata da:
- **Security Parameters Index (SPI):** un numero a 32 bit scelto dal mittente, usato per selezionare la SA corretta.
- **Indirizzo di destinazione:** deve essere un indirizzo IP unicast.
- **Protocollo di sicurezza:** AH o ESP.

## IPsec modes
==Transport Mode==: Protegge solo il payload del pacchetto IP, cioè i dati trasportati (come il livello trasporto — TCP/UDP). L’header IP originale resta visibile e non cifrato.

==Tunnel Mode==: Protegge l’intero pacchetto IP originale, incapsulandolo dentro un nuovo pacchetto IP. Questo crea un “tunnel” sicuro tra due gateway o host, nascondendo completamente il contenuto e l’header IP originale.

## Authentication with IPv4
L’header AH (Authentication Header) viene inserito subito dopo l’header IP esterno più esterno, sia in modalità Transport che Tunnel.

È importante ricordare che il controllo di integrità e l’autenticazione non coprono i campi dell’header IP che possono cambiare durante il percorso (campi mutabili o imprevedibili), quindi questi non sono protetti da AH.

![[Pasted image 20250625164950.png]]

## Authentication with IPv6
Intestazione AH inserita dopo l'intestazione IP più esterna, a seconda che venga utilizzata la modalità Trasporto o Tunnel. Non dimenticare che il controllo di integrità (e quindi l'autenticazione) non copre i campi di intestazione modificabili e imprevedibili.

![[Pasted image 20250625165033.png]]

## ESP with IPv4
In entrambe le versioni IPv4 e IPv6, l’header ESP viene inserito subito dopo l’header IP esterno, sia in modalità Transport che Tunnel.

- Alla fine del payload del livello trasporto (T-layer) viene aggiunto un padding, per aumentare la protezione contro l’analisi del traffico (traffic analysis).
- Dopo il payload con padding vengono aggiunti il trailer ESP e, opzionalmente, il campo di autenticazione ESP.

Come per AH, l’autenticazione e l’integrità non coprono i campi dell’header IP che possono cambiare durante il transito (campi mutabili o imprevedibili).

**ESP with IPv4**
![[Pasted image 20250625165322.png]]

**ESP with IPv6**
![[Pasted image 20250625165209.png]]
## Encryption + Authentication in IPsec
La combinazione di crittografia e autenticazione può avvenire in vari modi:
1. **ESP con autenticazione:** si cifra il dato con ESP e poi si aggiunge il campo AH.
2. **Transport mode:** crittografia e autenticazione si applicano al payload IP, ma l’header IP non è protetto.
3. **Tunnel mode:** crittografia e autenticazione si applicano all’intero pacchetto interno (payload + header).
4. **Transport Adjacency:** si usano due SA in cascata, prima ESP (crittografia), poi AH (autenticazione).
5. La crittografia copre il payload IP originale, mentre l’autenticazione protegge ESP più l’header IP originale, comprese le sorgenti e destinazioni.
6. **Transport-Tunnel bundle:** per autenticare prima della crittografia, si usa un SA AH in modalità transport interna e un SA ESP in modalità tunnel esterna.
7. L’autenticazione copre il payload IP e le parti immutabili dell’header IP; la crittografia copre l’intero pacchetto interno autenticato.

## IPsec vs TLS
TLS much more flexible because is in the upper levels
TLS also provides application end-to-end security, best for web applications $\to$ HTTPS 
IPsec hast to run in kernel space
IPsec much more complex and complicated to manage with

![[Pasted image 20250625165157.png]]