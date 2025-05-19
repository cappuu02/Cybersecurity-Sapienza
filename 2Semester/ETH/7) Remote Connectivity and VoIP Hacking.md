
## Dial-up Hacking

### Preparing to Dial up

Molte aziende mantengono ancora connessioni **dial-up** (vecchi server, network device, ICS). Il ciclo seguito dall’attaccante è classico: footprint → scan → enumerate → exploit, spesso automatizzato con un **wardialer**.
- **Phone-number footprinting**: raccolta dei blocchi numerici tramite elenchi telefonici, WHOIS, siti aziendali, chiamate manuali.
- Contromisure: obbligare a una password per le richieste d i nformazioni, ripulire i dati pubblici, formare il personale.

### Wardialing

L’efficacia dipende tanto dall’hardware (numero e qualità dei modem) quanto dal software. Strumenti comuni: **WarVOX**, **TeleSweep**, **PhoneSweep**. Da valutare i costi (linee urbane, internazionali) e i limiti legali sul wardialing.

### Brute-Force Scripting

Si classificano i numeri in **penetration domains** (Low Hanging Fruit, Single-/Dual-Authentication ± Limited Attempts) e si lancia uno script (ZOC, Procomm Plus, linguaggio **ASPECT**) per testare credenziali deboli.

### Dial-up Security Measures
1 . Inventariare tutte le linee dial-up  
2 . Concentrarle in un modem-bank isolato dalla LAN  
3 . Rendere le linee analogiche meno individuabili  
4 . Proteggere fisicamente gli armadi TLC  
5 . Monitorare sistematicamente i log  
6 . Non rivelare informazioni identificative al prompt  
7 . Imporre **multi-factor authentication** e dial-back  
8 . Formare l’help-desk sulla sensibilità delle credenziali  
9 . Centralizzare il provisioning e fissare policy rigorose

---

## PBX Hacking
Molti **PBX** dispongono ancora di modem per manutenzione remota. L’attacco replica il metodo dial-up: wardialing, brute-force su default ID/password (es. _maint/maint_, _sysadmin/sysadmin_).

- Difese: accendere i modem solo quando servono, usare più fattori di autenticazione.

---
## Voicemail Hacking
Brute-force su caselle vocali: serve il numero d’accesso, il mailbox ID (3-5 cifre) e un’ipotesi sul PIN numerico. Strumenti: **Voicemail Box Hacker**, **VrACK**, script ASPECT.

- Contromisure: lockout dopo errori, logging e review delle connessioni.

---

## VPN Hacking

### Google Hacking for VPN
Ricerca `filetype:pcf` rivela i profili Cisco VPN: il file **PCF** contiene host, group ID e talvolta la password (decifrabile con **Cain**). Evitare pubblicazioni incaut e, usare Google Alerts, sensibilizzare gli utenti.

### Probing IPsec VPN Servers
Scansione porta UDP 500, fingerprint dell’endpoint (Nmap, **NTA Monitor**, **IKEProber**), verifica della modalità Aggressive.

### Attacking IKE Aggressive Mode
Se il gateway supporta Aggressive Mode, l’autenticazione (pre-shared key) viaggia intercettabile. Raccolta con **IKEProbe**, crack con **IKECrack** o Cain. Soluzione: disabilitare Aggressive Mode e adottare token hardware.

### Hacking the Citrix VPN Solution
Un **Citrix client-to-site VPN** può esporre desktop e applicazioni remote; l’attaccante avvia nuovi processi (explorer.exe, cmd.exe, PowerShell) o abusa delle applicazioni pubblicate (Help, Office, IE, ecc.). Difese: segmentare e monitorare l’istanza Citrix, multifactor, security assessment continuo.

---
## VoIP Attacks

### SIP Scanning
Protocollo **SIP** (alternativa a H.323) – scanning dei proxy e device con **SiVuS**, **SIPVicious**. Prevenzione: separare la rete VoIP dal segmento utenti.

### Pillaging TFTP
Molti telefoni SIP scaricano la configurazione da un server **TFTP**: username e password compresi. Fasi: localizzare il server (Nmap) → brute-force sul nome dei file → download. Difesa: restringere l’accesso al TFTP.

### Enumerating VoIP Users
I messaggi SIP sono leggibili; strumenti (svwar.py, SIPScan, Sipsak) automatizzano l’enumerazione di utenti. Mitigazioni: segmentazione rete, IDS/IPS.

### Interception Attack
1 . **ARP spoofing** (dsniff, arp-sk) per dirottare SIP/RTP.  
2 . Identificare il codec, convertire l’audio (vomit, scapy). Toolkit completi: **UCSniff**, Wireshark con dissector RTP/SKINNY.

### Denial of Service
Invio massivo di `SIP INVITE` o flood verso un telefono singolo (Inviteflood, hack_library). Contromisure: VLAN separate voce/dati, autenticazione + cifratura SIP, IDS/IPS.

---
## Recap

- Politiche password ancora più stringenti e, dove possibile, **two-factor**.
- Provisioning centralizzato e auditing su ogni forma di accesso remoto.
- Eliminare software di controllo remoto non autorizzato.
- Non trascurare **PBX**, fax, voicemail: sono punti d’ingresso come i modem.
- Formare help-desk e utenti finali, diffidare delle promesse dei vendor.
- Applicare policy d’uso rigide e verificare la conformità con audit regolari.