
# Nmap
`Nmap –sn –PR –send-IP <IP-range>`
- `-sn` Disabilita la scansione delle porte: Nmap **si limita a vedere quali host rispondono**, senza controllare quali servizi hanno aperti
- `-PR` Nmap invia anche **ARP Request** (cioè: “chi ha questo indirizzo IP? Dammi il tuo MAC address”).
- `--send-IP` Non usare ARP, manda solo pacchetti IP (come ICMP, TCP, UDP...) per determinare se un host è attivo

`nmap -sS target.com -p 1417`
`nmap -sV target.com -p 1417`