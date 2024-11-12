## CCA Security
How to get both security and also authenticity?
**CCA**: Chosen-ciphertext attacks.

![[Cryptography/images/54.png]]

```ad-abstract
title: Definition CCA Security
$\pi = (ENC,DEC)$ is CCA-secure if:
$$GAME^{cca}_{\lambda, A} (\lambda, 0) \approx_c GAME^{cca}_{\lambda, A} (\lambda, 1)$$

```

>==Malleability==: ability to take some $c^*$ containing unknown m^*, and mail it into $\widetilde c \not = c^*$ such that you don't know the corresponding in $\widetilde m$, but you know $\widetilde m$ is related to $m^*$ (e.g. $m[1] = m^*[1]$)

Think of encrypted actions:

![[Cryptography/images/52.png]]
![[Cryptography/images/53.png]]

> OBS: CCA $\Rightarrow$ non-malleability!

What about the SKE we studied? They are not (none of them, CBC, OFB, CFB, CTR). 
For instance: $c (r, F_k(r) \oplus m)$
Not CCA secure: $(r + U_n \text{is the randomness})$
What happens if we do: 
$c = (r,s)$
$\widetilde c = (r, s \oplus 10^{n-1})$ where
	$s = F_k (r) \oplus (m \oplus 10^{n-1})$
	Flipping first but of $s$

Make it on attack!
![[Cryptography/images/55.png]]
![[Cryptography/images/56.png]]

$Q:$ How do we get CCA security?
Natural idea: Continue CPA security with UFCMA MAC.
Intuition: Make sure CTX contains a tag of SMT. Then :
- CTX with valid tag is VALID
- CTX with invalid tag is INVALID (DEC outputs "")

Attempts:
1) $c' = (c, r); (k_1, k_2) = k$
	$c \in ENC(k_1, m) \hspace{0.2cm} \text{[CPA]} \hspace{0.2cm}; c = TAG(k_2, m) \hspace{0.2cm} \text{[UFCMA]} \hspace{0.2cm}$
	CCA? Not in general. In fact, not even CPA! Let tag ????? UFCMA MAC.
	Consider $\widetilde{Tag}(k_2,m)= b \mid \mid r$
	$r = Tag(k_2, m)$
	b = first bit of $m$
	$\widetilde{Tag} =$ UFCMA ? By reduction:

	![[Cryptography/images/57.png]]
	![[Cryptography/images/58.png]]

2) The problem was that $r$ can reveal something about $m$. Let's encrypt the tag!
	$$c' \leftarrow Enc(k_1, m \mid \mid r)$$$$r = Tag(k_2,m)$$
	Output $c'$ only. This is used in TLS.
	CCA? No! Not in general.
	$Enc = CPA \hspace{0.9cm} Tag=UF-CMA$
	$c=(R,S) \hspace{0.9cm} s = F_{k_1}(r) \oplus (m \mid \mid r)$
	$r = F_{k_2}(m)$
	$e = b \mid \mid r'$
	
	![[Cryptography/images/59.png]]
	
	$\widetilde{Enc} (k_1, m): c \leftarrow Enc(k_1, m) \hspace{0.9cm} \text{ENC ANY CPA SKE}$
	![[Cryptography/images/60.png]]
	$\widetilde{Enc} (k_1, m) = b \mid \mid Enc(k_1, m)$
	$b \leftarrow \{0,1\}$
	$Enc = CPA$
	$\widetilde Dec(k_1, b \mid \mid c): \hspace{0.5cm} \text{Discard} \hspace{0.5cm} b \hspace{0.5cm} \text{Derypt} \hspace{0.5cm} c$
	$\widetilde Enc \equiv CPA!$

3) $c' = (c, r)$
	$c \leftarrow Enc(k_1, m)$
	$r = Tag(k_2, c)$
	==**Theorem**==: If $\pi_1 = (Enc, Dec)$ is $CPA$ Secure and $\pi_2 = Tag$ is UF-CMA, then above $\pi' = (Enc', Dec')$ is CCA-Secure.

	General Technique: CCA Security follows from two isolated properties:
	-  CPA security
	- Authenticity $\rightarrow$ Not possible to create valid ctx ????? key

	![[Cryptography/images/61.png]]
