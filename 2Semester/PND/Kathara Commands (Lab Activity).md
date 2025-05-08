# Introduction
In order to (properly) use Internet a host has to receive 4 main pieces of
information:
- The IP address
- The netmask
- The IP address of its default gateway
-  The IP address of a DNS (Domain Name Server)

Generally located in `/etc/network/interfaces`
Usually you can insert additional configuration files in the `/etc/network/interfaces.d/` directory. `Ex: /etc/network/interfaces.d/eth0`
After the modifications, use the `ifup/ifdown` commands
![[1ka.png]]

>Warning: since kathara is based on docker, the ifup command will not change the `/etc/resolv.conf` file and you have to do it manually

## Manual network configuration (linux) (old school – legacy)
`ifconfig` to assign the IP address. 
This command is used to configure network interfaces, or to display their current configuration. In addition to activating and deactivating interfaces with the “up” and “down” settings (`ifup` and `ifdown`)

`route` to define the default gateway
The route command is the tool used to display or modify the routing tab `/etc/resolv.conf` to specify the DNS server(s)
##  Manual network configuration using ip (preferred)
`ip addr` to assign the IP address.
This command is used to configure network interfaces, or to display their current configuration. In addition to activating and deactivating interfaces with the “up” and “down” settings.

- ip route to define the default gateway
- The route command is the tool used to display or modify the routing table `/etc/resolv.conf` to specify the DNS server(s).

## Lab 1 Ex 1
**Configure pc1 using the interfaces file**

``` python
ip addr flush eth0 # **rimuove tutte le configurazioni IP** da eth0.
auto eth0
iface eth0 inet static
    address 192.168.100.26
    netmask 255.255.255.248
    gateway 192.168.100.30
    dns-nameservers 8.8.8.8

ifdown eth0 && ifup eth0 #spegne e riaccende l'interfaccia
```

Questa è una **configurazione statica** da inserire nel file `/etc/network/interfaces`.
- `auto eth0`: Dice al sistema di attivare automaticamente l’interfaccia `eth0` al boot.
- `iface eth0 inet static`: Specifica che l’interfaccia userà una configurazione IP **statica**, non DHCP.
- `address`: IP assegnato manualmente al nodo (es. `192.168.100.26`).
- `netmask`: La subnet mask, qui `/29` → `255.255.255.248`.
- `gateway`: Gateway predefinito, che è `r1` nel tuo caso.
- `dns-nameservers`: Server DNS da usare, in questo caso Google (`8.8.8.8`).


**Configure pc2 using the ip command**

```python
ip addr flush dev eth0 #1
ip addr add 192.168.100.27/29 dev eth0 #2
ip route add default via 192.168.100.30 #3
```

2. Questo comando **assegna manualmente** all'interfaccia `eth0` l'indirizzo IP `192.168.100.27` con subnet `/29`
3. Questo comando imposta **la route predefinita** (default gateway) per il traffico destinato a Internet o a reti diverse. Tutti i pacchetti che **non sono per la rete locale** verranno instradati attraverso `192.168.100.30`, che nel tuo caso è `r1`, il router.


**Configure pc3 using the ifconfig command**

``` python
ifconfig eth0 192.168.100.28 netmask 255.255.255.248 up #1
route add default gw 192.168.100.30 #2

```

1. Configura l'interfaccia `eth0` con:
	- **IP:** `192.168.100.28`
	- **Netmask:** `255.255.255.248` (che corrisponde a `/29`)
	- `up`: attiva l’interfaccia se era spenta
2. Imposta **il default gateway** (cioè dove mandare tutto il traffico non locale) su `192.168.100.30`, che nel tuo setup è `r1`.

**Configurazione Router r1**

```python
ip addr replace 192.168.100.30/29 dev eth0 #1
iptables -t nat -A POSTROUTING -o eth1 -j MASQUERADE #2
```

1. Questo comando **assegna l'indirizzo IP** `192.168.100.30/29` all'interfaccia `eth0` di `r1`. Questo rende `r1` il **gateway della rete LAN** (interfaccia verso `pc1` e `pc2`).
2. Questo comando **attiva il NAT** (Network Address Translation) sulla **seconda interfaccia di `r1`**. **serve per fare NAT**, così i PC possono navigare su Internet passando da `r1`.

## Lab 1 Ex 2

Su router 1 andare in `/etc/udhcpd.conf` ed editare le seguenti cose:
![[2ka.png]]
![[3ka.png]]

Poi avviare il server dhcp con il comando: `udhcpd -f udhcpd.conf`

```ad-abstract
title: PC1 Setup

Su pc1 andare in /etc/network/interfaces.d/eth0 e scrivere:
`auto eth0`
`iface eth0 inet dhcp`
poi fare:
`ifup eth0`
ed ottiene l'ip dinamico dal server dhcp
```


```ad-abstract
title: PC2 Setup

Su pc2, più semplice, fare:
`dhclient eht0`
```


## Lab 1 Ex 3

```ad-bug
Da fare

```

## Lab 2 Ex 1
Configurare una topologia con:
- Un router (`r1`) con due interfacce (LAN1 e LAN2)
- Quattro host (`pc1`, `pc2`, `pc3`, `pc4`) distribuiti su due LAN
- Indirizzi IPv6 statici assegnati manualmente
- `r1` come gateway predefinito per tutti i PC, usando il suo indirizzo link-local

---

### Topologia
- **LAN1 (eth0 su r1):** `2001:db8:cafe:1::/64`
  - `pc1`: `2001:db8:cafe:1::101/64`
  - `pc2`: `2001:db8:cafe:1::102/64`
- **LAN2 (eth1 su r1):** `2001:db8:cafe:2::/64`
  - `pc3`: `2001:db8:cafe:2::103/64`
  - `pc4`: `2001:db8:cafe:2::104/64`
- **Router `r1`**
  - LAN1: `2001:db8:cafe:1::1/64`, `fe80::1`
  - LAN2: `2001:db8:cafe:2::1/64`, `fe80::1`

---

### Configurazione

#### ✅ Router `r1` (`r1.startup`)
```bash
ip -6 addr add 2001:db8:cafe:1::1/64 dev eth0
ip -6 addr add fe80::1 dev eth0

ip -6 addr add 2001:db8:cafe:2::1/64 dev eth1
ip -6 addr add fe80::1 dev eth1

sysctl -w net.ipv6.conf.all.forwarding=1
echo "nameserver 8.8.8.8" > /etc/resolv.conf


```

#### PC1 (and others)
``` bash
auto eth0
iface eth0 inet6 static
    address 2001:db8:cafe:1::101
    netmask 64
    gateway fe80::1
    dns-nameservers 8.8.8.8
```

### Testing
**Verifica locale**
`ip -6 addr show`

**Ping del router via link-local**
`ping6 fe80::1%eth0`

**Ping del router via GUA**
`ping6 2001:db8:cafe:1::1`

**Ping tra host nella stessa LAN**
`ping6 2001:db8:cafe:1::102`

>Nell'esercizio tutti (sia pc sia r1) avevano un indirizzo IPv6 GUA (Global Unicast Address) e solo r1 aveva due indirizzi Link-Local.

## Lab 2 Ex 2 (SLAAC, No DHCPv6)
Guida [IP Sysctl](https://docs.kernel.org/networking/ip-sysctl.html)

```ad-abstract
title: SLAAC
**SLAAC** (Stateless Address Autoconfiguration) è un meccanismo di **autoconfigurazione automatica degli indirizzi IPv6** che consente a un host di generarsi un indirizzo IPv6 **senza bisogno di un server DHCP**.




```

**Funzionamento**
- **Il router** sulla rete invia un **Router Advertisement (RA)**.
    - Questo pacchetto contiene il **prefisso IPv6** della rete (es. `2001:db8:cafe:1::/64`).
    - Indica che gli host possono configurarsi **da soli** (stateless).
- **Il PC riceve il RA** e:
    - Usa il **prefisso** (es. `2001:db8:cafe:1::/64`)
    - Combina quel prefisso con il proprio identificatore di interfaccia (in genere derivato dal MAC) per generare un indirizzo **completo**.
    - Esempio finale: `2001:db8:cafe:1::abcd:1234:5678:9abc`
- L'host si configura **automaticamente** e inizia a usare quell’indirizzo.

>==radvd== è un demone per la gestione dei messaggi di pubblicità router (Router Advertisement) in IPv6

The router Advertaisement is from the link local address of the router to multicast local ipv6 (all the devices that can speack ipv6)


### Router R1 Configuration
`radvd -n -C /etc/radvd.conf/` Avviare il daemon

### PC1 Configuration
`nano /etc/network/interfaces.d/eth0`
`iface eth0 inet6 auto`
`ifup eth0`
`tcpdump -t -vv`

>Configurato tramite **Interfaces**
### PC2 Configuration
`sysctl -w net.ipv6.conf.eth0.forwarding=0` turn off the forwarding like a router!

```ad-important
Se non disattivo questo il pc2 non riceverà l'advertaisement ma lo forwarderà come un router! Se non ricevo l'Adv di conseguenza non posso ottenere il GUA (Global Unicast Address). Per disattivarlo impostarlo a 0. Qualsiasi valore diverso da zero viene considerato come TRUE!

```

In generale per PC2 io devo settare il "**Random Interface ID**" dunque:
`sysctl -w net.ipv6.conf.eth0.addr_gen_mode=3`
After that the address that we will obtain will be dynamic and not similar to MAC!

### PC3 Configuration
**PC3 has to use stable privacy extension, setting the stable_secret**

Se proviamo ad eseguire `sysctl -w net.ipv6.conf.eth0.addr_gen_mode=2` non funziona perchè, il numero 2, permette di generare un stable privacy addresses utilizzando un secret from stable_secret. Se infatti controlliamo vedremo che non ce l'abbiamo `sysctl net.ipv6.conf.eth0.stable_secret`. Quindi ne prendiamo uno, anche di un altro pc, lo scrivimo con `-w` e poi possiamo settare `addr_gen_mode=2`.

### PC4 Configuration
**pc4 has to use the EUI-64 and use the temporary addresses. Set up a short lifetime in order to see multiple addresses.**

`sysctl -w net.ipv6.conf.eth0.temp_valid_lft=180`
`sysctl -w net.ipv6.conf.eth0.temp_prefered_lft=60`
`sysctl -w net.ipv6.conf.eth0.use_tempaddr=1`

Questa configurazione su **PC4** abilita gli **indirizzi IPv6 temporanei** per proteggere la privacy:

- Usa **EUI-64** per generare l’indirizzo principale (basato sul MAC address).
- Abilita anche **indirizzi temporanei** (`use_tempaddr=1`), che cambiano nel tempo.
- Gli indirizzi temporanei:
    - Sono **preferiti** solo per 60 secondi.
    - **Scadono** dopo 180 secondi.
- Questo permette di osservare il cambio automatico degli indirizzi temporanei in pochi minuti.

```ad-abstract
title: addr_gen_mode
Definisce **come** il sistema genera gli indirizzi IPv6 (es. link-local o quelli da autoconfigurazione SLAAC):

![[Pasted image 20250508224918.png]]


```



```ad-abstract
title: Stable_secret
È una **chiave segreta** usata per generare **indirizzi IPv6 stabili e privati**, secondo l’RFC 7217. Normalmente, IPv6 può generare indirizzi usando l’hardware (es. MAC address) → questo può **rendere tracciabile il dispositivo**. Con un `stable_secret`, si può generare un indirizzo **stabile ma non tracciabile**, perché non è legato al MAC.

**Quando si usa?**
Quando `addr_gen_mode = 2` o `3` (vedi sotto), cioè quando vuoi indirizzi IPv6 **stabili ma privati**.

```



