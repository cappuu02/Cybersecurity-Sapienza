
# Introduction
## Part I Casing The Establishment Case Study: How A Hacker Works
IAAAS (It’s All About Anonymity, Stupid)
- The ==Onion Router (Tor)==, www.torproject.org
	- Layered cryptography with SOCKS proxy
	- Anonymous outgoing TCP connections
- Tor GUI client (==Vidalia==) and ==Privoxy== (web filtering proxy)
- Google on browser for juicy targets
- tor-resolve instead of host for IP addresses
- proxychains to force connections through Tor
	- Nmap to scan services on targets
socat to relay persistently
-  nc (netcat) to send requests to servers (check server)
- Exploit vulnerabilities to pwn (own or compromise)

## The Onion Router (TOR)![[4ka.png]]![[5ka.png]]
>==Vidalia== is a discontinued cross-platform GUI for controlling Tor. It allows the user to start, stop or view the status of Tor.

## Privoxy
```ad-abstract
title: Definition
==Privoxy== is a free web proxy for **improve** privacy, manipulating cookies and modifying web page data and HTTP headers before the page is rendered by the browser.

```

Privoxy riceve richieste HTTP dal tuo browser, le analizza, le può modificare (es. rimuove pubblicità o intestazioni traccianti), e poi le inoltra verso Internet, eventualmente passando per un altro proxy come TOR.

```ad-example
Immagina di usare un browser per visitare un sito. Senza Privoxy, la richiesta va direttamente a Internet. Con Privoxy:

1. Il browser invia la richiesta a Privoxy.
    
2. Privoxy **la filtra**: rimuove pubblicità, blocca cookie, cambia informazioni come l’User-Agent.
    
3. Privoxy la inoltra a Internet oppure a TOR.
    
4. La risposta fa il percorso inverso.

```

>Protegge la privacy utente, filtra contenuti web e fa da ponte tra browser HTTP e un proxy SOCKS come TOR.


## Tor-resolve
**tor-resolve** is a simple script to connect to a SOCKS proxy that knows about the SOCKS RESOLVE command, hand it a hostname, and return an IP address. https://linux.die.net/man/1/tor-resolve.

`tor-resolve www.example.com 10.10.10.100`

## 🧰 COS'È PROXYCHAINS 
**ProxyChains** è uno **strumento da terminale** che permette di forzare un qualsiasi tool (come `nmap`, `curl`, `sqlmap`, `ssh`, ecc.) a **passare il proprio traffico attraverso uno o più proxy**, anche se **non li supporta nativamente**.

Funziona **intercettando le chiamate di rete** e inoltrandole a uno o più proxy SOCKS o HTTP.

### 🧅 COSA C'ENTRA TOR?
La rete **TOR** fornisce un **proxy SOCKS5** (di solito in ascolto su `127.0.0.1:9050`), che **anonimizza il traffico** instradandolo attraverso i suoi **nodi a cipolla** (onion routing).

Ma… molti strumenti (tipo `nmap`, `hydra`, `sqlmap`) **non sono compatibili direttamente con SOCKS5**.

Ed è qui che entra in gioco **ProxyChains**. Serve come **ponte tra questi tool e la rete TOR**

## NMAP
```ad-abstract
title: Definition

==Nmap== is a free software distributed under the GNU GPL by Insecure.org **created to perform port scanning**, that is, aimed at **identifying open ports on a target computer or even ranges of IP addresses, in order to determine what network services are available**. [nmap_cheatsheet](https://www.stationx.net/nmap-cheat-sheet/)
```

## Socat
```ad-abstract
title: Definizione
`socat` è uno strumento da riga di comando che crea connessioni **bidirezionali** tra due stream di dati. È come un **coltellino svizzero per le comunicazioni di rete**: può collegare porte TCP, file, socket UNIX, ecc.

```


`socat TCP4-LISTEN:8080, fork SOCKS4a:127.0.0.1:10.10.10.100:80, socksport=9050 &`

- Apri un proxy **locale** su `localhost:8080`
- Tutto il traffico inviato lì sarà **inoltrato via Tor** (tramite il SOCKS proxy di Tor)
- Alla fine, il traffico raggiunge la macchina di destinazione `10.10.10.100` sulla **porta 80**

# Footprinting (Chapter1)
Internet footprinting
1. Determine the scope of your activities
2. Get proper authorization
3. Publicly available information
4. WHOIS & DNS enumeration
5. DNS interrogation
6. Network reconnaissance

## What is Footprinting?
```ad-abstract
title: Definition
Il **footprinting** è la **fase iniziale di raccolta di informazioni** su un bersaglio (persona, organizzazione, sistema) in ambito cybersecurity, spesso eseguita **prima di un attacco** informatico. 

Lo scopo è quello di capire la superficie di attacco, raccogliere dati pubblicamente disponibili e preparare exploit o attacchi mirati.

```

What to footprint?
- **Internet**: nomi di dominio, indirizzi IP, servizi TCP/UDP attivi, sottodomini, configurazioni DNS, architetture hardware/software.
- **Intranet** (se accessibile): nomi di rete interni, protocolli usati, accessi, IDS (sistemi di rilevamento intrusione).
- **Accessi remoti**: VPN, meccanismi di autenticazione, numeri di telefono.
    
- **Extranet**: partner esterni, connessioni business-to-business.

## Internet Footprinting
**Step 1 – Determinare lo scopo delle attività**
- Bisogna chiarire **cosa si vuole analizzare
- Definire i **limiti legali ed etici**:
- Domanda guida: _"Qual è il perimetro della mia analisi?"_

**Step 2 – Ottenere l'autorizzazione**
- Fondamentale in ambito legale ed etico: **mai fare footprinting su sistemi senza autorizzazione**.

**Step 3 – Raccogliere informazioni pubblicamente disponibili**
- È la parte più vasta e attiva del footprinting. Si raccolgono dati da:
    - **Siti aziendali ufficiali**
    - **Motori di ricerca**
    - **Social network e profili dei dipendenti**
    - **Archivi online (es. Archive.org)**
    - **Annunci di lavoro** (per capire software e tecnologie usate)
    - **Policy di privacy e sicurezza**
    - **Eventi aziendali critici** (es. fusioni o licenziamenti)
## Publicly Available Information 
### Company Web Pages
**Tecniche e strumenti per l'esplorazione e l'accesso non autorizzato a risorse web nascoste o interne**, come: visualizzare il codice sorgente HTML offline, scoprire contenuti nascosti nei commenti, enumerare file e directory con tool come DirBuster, usare proxy e VPN per accedere a risorse interne, e cercare sottodomini o siti secondari.


### Related Organizations Location Details
**Raccolta di informazioni (OSINT)** per attacchi: cercare collegamenti ad altre organizzazioni, identificare partner esterni potenzialmente vulnerabili, raccogliere dettagli fisici (per sorveglianza o accessi non autorizzati), analizzare immagini per dati sensibili e usare servizi come Google Maps o Skyhook per mappare indirizzi MAC Wi-Fi a posizioni reali.

### Employee Information 
**Informazioni personali e professionali possono essere raccolte online** (tramite social network, siti di ricerca persone e annunci di lavoro) per ottenere dati sensibili, identificare dipendenti ed ex-dipendenti, e sfruttare vulnerabilità come PC personali o utenti scontenti. L’OSINT Framework aiuta a strutturare queste ricerche.

### Current Events
**Eventi aziendali critici** (fusioni, licenziamenti, scandali, ristrutturazioni) possono generare **debolezze nella sicurezza** dovute a bassa morale, disorganizzazione o accessi non controllati. Le fonti pubbliche come i report SEC (10-Q, 10-K), Sec.gov e forum finanziari (es. Yahoo! Finance) possono rivelare **informazioni utili su struttura, personale e vulnerabilità potenziali**.

### Privacy or Security Policies Archived Information
Privacy or security policies
- Technical details indicating the types of security mechanisms in place Archived information
- Archived copies > current copies
- Archive.org & cached results at Google

### Search Engines and Data Relationships
- Google.com, bing.com, yahoo.com, dogpile.com, ask.com
- Search strings used by hackers
- Search Google’s cache for vulnerabilities, errors, configuration issues
- Analyze metadata in web files for info leaks

## WHOIS and DNS Enumeration
### 🔧 ICANN (Internet Corporation for Assigned Names and Numbers)
- Organizzazione responsabile della gestione centralizzata di:
    - Nomi di dominio (es. `example.com`)
    - Indirizzi IP (es. `192.168.1.1`)
    - Numeri di porta (es. `80`, `443`)
- Le informazioni sono memorizzate in **server WHOIS e DNS**, organizzati in modo **gerarchico**.

### 🔍 WHOIS: Le "3 R" da conoscere
La ricerca WHOIS fornisce dati su tre livelli:
1. **Registry** – Organizzazione che gestisce il TLD (es. `.com` → Verisign)
2. **Registrar** – Provider presso cui è stato registrato il dominio (es. MarkMonitor)
3. **Registrant** – Proprietario effettivo del dominio (es. azienda o persona fisica)

```ad-example
title: 🧭 Esempio: Analisi del dominio `keyhole.com`

1. **Inizio della ricerca**: vai su `whois.iana.org`
2. **Trova il registry per `.com`**: `verisign-grs.com`
3. **Trova il registrar di `keyhole.com`**: `markmonitor.com` 
4. **Ottieni i dati del registrant**: nome, email, organizzazione → possono essere utilizzati in attacchi di spoofing o ingegneria sociale

```

**Strumenti per effettuare ricerche WHOIS**
- **Command-line tools**:
    - `whois keyhole.com`
- **Servizi web**:
    - WHOIS online (es. `whois.domaintools.com`)
- **Strumenti automatici**    
    - `allwhois`, `uwhois`
- **Interfacce grafiche (GUI)**:
    - SuperScan
    - NetScan Tools Pro

![[2Semester/ETH/Images/38.png]]

### Public Database Security Countermeasures
```ad-danger
**misure da adottare per proteggere le informazioni esposte pubblicamente**, in particolare attraverso **WHOIS** e **DNS**.
Quando un’azienda registra un dominio o gestisce dei record DNS, **alcune informazioni diventano pubblicamente accessibili** — e possono essere sfruttate da hacker o analisti per attacchi o ricognizioni.

```

- ==Keep administrative contacts up-to-date== (contatti amministrativi aggiornati)
- ==Anonymize== administrative contacts 
- Authenticate updates rigidly to avoid domain hijacking
	- Using passwords or PGP, not FROM field of email addresses
	- AOL in 1998: redirected traffic

### DNS - Start Of Authority (SOA) record
![[2Semester/ETH/Images/39.png]]

**Ogni zona DNS (., edu, ccsf.edu)** ha il proprio **SOA**.  
Ogni volta che cambi zona, viene consultato (anche implicitamente) il suo **record SOA**, per sapere chi ha l’autorità e gestisce i dati di quella zona.

```ad-info
- **Il PC chiede:** "Dove si trova `www.ccsf.edu`?"
    
- **Il DNS locale** non lo sa → interroga i server DNS in ordine gerarchico:
    
- 🔹 **Zona root (`.`):**  
    → "Chi gestisce `edu`?"  
    ↳ Riceve i server autoritativi per `edu` (SOA della root).
    
- 🔹 **Zona `edu`:**  
    → "Chi gestisce `ccsf.edu`?"  
    ↳ Riceve i server autoritativi per `ccsf.edu` (SOA di `edu`).
    
- 🔹 **Zona `ccsf.edu`:**  
    → "Qual è l’IP di `www.ccsf.edu`?"  
    ↳ Riceve la risposta (SOA di `ccsf.edu` usato internamente).

```

### DNS record types
![[2Semester/ETH/Images/40.png]]


## DNS Interrogation
**Spiegazione**
È il processo di interrogare i server DNS per raccogliere **informazioni sensibili** su una rete/organizzazione, come nomi di host interni, indirizzi IP, configurazioni e altro ancora.

Un'operazione che trasferisce l’intera zona DNS (contenente tutti i record DNS) da un server primario a uno secondario. Se mal configurata, può essere **sfruttata da utenti non autorizzati** per ottenere tutte le risorse DNS.

**Motivi comuni per cui fallisce la sicurezza:**
- Errata configurazione
- Nessun controllo su chi può richiedere il trasferimento
- Informazioni DNS interne esposte

```ad-abstract
title: Definition


```
`nslookup` (Tool da riga di comando) permette di interrogare server DNS manualmente.

```ad-example
Si sta interrogando il server `ns1.example.com`. Viene cercato l'host `192.168.1.1`, che risponde con il nome `gate.example.com`.

![[2Semester/ETH/Images/41.png]]
![[2Semester/ETH/Images/42.png]]


```


Altri strumenti:
- `dnsrecon`, `dnsenum`, `dnsmap`, `fierce`, `host`: strumenti per automatizzare interrogazioni DNS e scoperta di nomi di dominio/host
- `grep`, `awk`, `sed`, `perl`: strumenti per filtrare e analizzare in modo avanzato l'output

### DNS Security Countermeasures
- Restrict zone transfer to only authorized servers
	- named.conf in BIND
- Configure a **firewall** to deny unauthorized inbound connections to TCP port 53 (thwart zone transfer) DNS - Domain Name System.
-  Configure not to provide internal DNS info
- Discourage the use of HINFO records


## Network Reconnaissance
La sezione **"Network Reconnaissance"** riguarda la **mappatura della rete** per identificare i dispositivi lungo il percorso (router, firewall, gateway) tra un attaccante e il bersaglio. Questo è un passo essenziale per preparare attacchi più mirati.

```ad-abstract
title: Definizione
È il processo di **esplorazione attiva della rete** per determinare:

- **Topologia** (struttura della rete)
- **Percorso dei pacchetti** (attraverso quali dispositivi passano)
- **Indirizzi IP** intermedi
- **Difese** come firewall o filtri

```


`traceroute`, `tracert`, `visualroute`, `McAfee's` , `NeoTrace`, `Foundstone's Trout`, 

**Teniche utilizzate**
- **TTL (Time To Live)**: viene decrementato ad ogni salto; quando arriva a zero, il nodo intermedio invia un messaggio di errore, rivelandosi.
- **ICMP (Internet Control Message Protocol)**: usato per i messaggi di rete, come gli errori o le risposte dei router nei traceroute.

Gli amministratori di rete possono **limitare o ostacolare la ricognizione** con strumenti tipo `snort`, `siabilitare ICMP`, `Firewall e rate limiting`

![[2Semester/ETH/Images/43.png]]
