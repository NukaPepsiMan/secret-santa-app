# secret-santa-app

## Setup di installazione e configurazione

(Su Windows in breve vi dico come configurare Laragon nel caso)

1. Variabili di ambiente: Menu  -> tool -> path -> add laragon to path
2. Scarica Postges: Menu -> tool -> Quick add -> postgres 17.2
3. Abilitare su Menu -> PHP -> extensions -> pdo_pgsql, pgsql, zip
4. Premere sul pulsante database: aggiungere una nuova connessione(configurare ip,porta,ecc..)
5. Riavviare il terminale ed IDE

---

## Installazione pacchetti 

1. composer install 

2. npm install

3. php artisan migrate::fresh --seed (qui sto dicendo -> droppa tutte le table e rilancia tutte le migration con un nuovo seed)

---

## configurazione login

A questo punto sono stati lanciati tutti i factory degli user,event,ecc...
Ora ci servono le credenziali di un utente già registato che andiamo a pescare con tinker

 Apro tinker.

    php artisan tinker


Qua dico prendi il primo partecipante in attesa.

    $participnat = App\Models\Participant::where('status','pending')->first();

Qua dico prendi l'utente associato al partecipante.
    
    $user = User::find($participnat->user_id)

Qua dico per questo utente setta la password con pippo.
    
    $user->password = Hash::make('pippo');


Salvo le modifiche sull'utente.

    $user->save();


Stampo le proprietà dell'utente in modo da copiarmi l'email.
    
    $user
    

Ora basta utilizzare la mail e la password settata precedentemente per loggarci con quell'utente.

