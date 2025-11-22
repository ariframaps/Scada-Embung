# Page snapshot

```yaml
- generic [ref=e3]:
  - navigation [ref=e4]:
    - link "Kontrol Pipa Embung" [ref=e6] [cursor=pointer]:
      - /url: /
      - img "Kontrol Pipa" [ref=e7]
      - generic [ref=e8]: Embung
  - generic [ref=e10]:
    - generic [ref=e11]:
      - generic [ref=e12]: Username
      - textbox "Username" [ref=e15]:
        - /placeholder: username anda
        - text: admin
    - generic [ref=e16]:
      - generic [ref=e17]: Password
      - generic [ref=e18]:
        - textbox "Password" [ref=e21]:
          - /placeholder: Password anda
          - text: passwordsalah
        - button "Hide" [ref=e22]
    - alert [ref=e23]:
      - generic [ref=e25]:
        - text: Login Gagal!
        - text: Invalid username or password
    - button "Login" [ref=e26]
```