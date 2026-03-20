// ============================================
// LES AVENTURES DE LULU & SENIOR CORBATIN
// Données du jeu - Niveau CEB (6e primaire)
// Questions inspirées des épreuves CEB 2010-2025
// ============================================

// ===== DIALOGUES AVENTURE =====
const STORY_INTROS = {
    histoire: [
        "Lulu gratte un riff flamenco-metal dans le jardin quand soudain... un vieux livre tombe d'un arbre ! « Regarde Corbatin, c'est un livre sur la Belgique ! »",
        "Senior Corbatin a trouvé une carte au trésor dans le potager ! « Pour avancer, il faut répondre aux questions sur notre pays ! » Lulu fait claquer ses cordes : « ¡Vamos! »",
        "Lulu tape sur ses casseroles façon batterie flamenca quand Corbatin arrive en courant : « J'ai trouvé une machine à voyager dans le temps belge ! »",
    ],
    corps: [
        "Corbatin a mal au ventre après trop de chocolat belge. « Mais comment ça marche un ventre ? » demande Lulu en riant.",
        "Lulu fait un concert de flamenco-metal dans le jardin et se demande : « ¿Por qué mon cœur bat plus vite quand je joue ? »",
        "Senior Corbatin a construit un robot avec des pots de fleurs. « Mais un vrai corps, c'est comment ? » Lulu pose sa guitare : « Bonne question ! »",
    ],
    francais: [
        "Lulu écrit une chanson rock-flamenco mais elle a besoin d'aide avec les mots ! « Corbatin, aide-moi ! »",
        "Senior Corbatin veut écrire une lettre à la reine des fourmis du jardin. « Comment on écrit ça bien ? »",
        "Lulu et Corbatin jouent aux poètes dans la cabane. Qui fera la plus belle phrase ? « Moi je mets du flamenco dedans ! » dit Lulu.",
    ],
    math: [
        "Lulu veut partager ses frites avec Corbatin mais combien chacun ? « Les maths, c'est comme la musique, faut compter les temps ! »",
        "Corbatin construit un château de bâtons dans le jardin. « Il me faut des calculs pour que ça tienne ! »",
        "Lulu vend des tickets pour son concert flamenco-metal dans le jardin. « Combien j'ai gagné ? Aide-moi à calculer ! »",
    ],
    sciences: [
        "Corbatin a trouvé un microscope géant dans le jardin ! « C'est quoi ce truc ? »",
        "Lulu : « Les sciences, c'est comprendre pourquoi les choses sont comme elles sont ! »",
        "Senior Corbatin observe les nuages... « Pourquoi il pleut ? Et pourquoi le ciel est bleu ? »",
    ],
    mix: [
        "Lulu : « On mélange tout ! Le grand défi ! ¡Vamos! »",
        "Corbatin : « Croâ ! Toutes les matières en même temps ! »",
    ],
    memo: [
        "Lulu et Corbatin ont caché des trésors dans le jardin ! Retrouve les paires !",
        "Senior Corbatin a mélangé toutes les cartes ! « Lulu aide-moi à retrouver les paires ! »",
        "Un lutin farceur a retourné toutes les cartes du jardin... ¡Vamos, à toi de jouer !",
    ]
};

const STORY_CORRECT = [
    "🥁 Lulu fait un blast beat de victoire ! ¡Olé!",
    "🐦‍⬛ Corbatin fait trois loopings dans le ciel étoilé !",
    "🍫 Lulu te donne un chocolat belge virtuel ! Miam !",
    "🥁 Lulu tape un roulement de batterie : « BRAVO ! »",
    "🍟 « Ça mérite une frite ! » dit Lulu en riant.",
    "🐦‍⬛ Corbatin croasse de joie depuis le toit !",
    "🥁 Lulu gratte un accord flamenco-metal de victoire ! « ¡Muy bien! »",
    "🌙 La lune brille plus fort pour toi ce soir !",
];

const STORY_WRONG = [
    "🥁 Lulu rate un temps : « Oups ! C'est pas grave, on apprend ! »",
    "🐦‍⬛ Corbatin penche la tête : « Croâ... Essaie encore ! »",
    "🍫 « Même le chocolat fond parfois ! » dit Lulu pour encourager.",
    "🐦‍⬛ Corbatin console : « C'est en se trompant qu'on devient champion ! »",
    "🌙 « La nuit est encore longue, on a le temps d'apprendre ! »",
];

const RESULTS_DIALOGUES = {
    excellent: [
        "🥁🐦‍⬛ Lulu et Corbatin dansent sous la lune ! Tu es un CHAMPION !",
        "Corbatin fait 3 loopings ! Lulu joue un blast beat monumental pour toi !",
    ],
    good: [
        "🥁 Lulu te prépare un cornet de frites virtuel ! « T'es vraiment fort ! »",
        "Corbatin croasse si fort que les chauves-souris s'envolent ! « Super travail ! »",
    ],
    ok: [
        "🐦‍⬛ Corbatin dit : « Croâ ! Pas mal ! On s'entraîne encore ! »",
        "Lulu sourit : « Chaque erreur, c'est un pas de plus vers le sommet ! Continue ! »",
    ],
    needsWork: [
        "🐦‍⬛ Corbatin se pose sur ton épaule : « T'inquiète, on re-essaie ! »",
        "Lulu joue un air doux : « Même les rockstars galèrent au début ! »",
    ]
};

// ===== QUESTIONS HISTOIRE DE BELGIQUE & GÉOGRAPHIE (Niveau CEB) =====
const QUESTIONS_HISTOIRE = [
    // --- Belgique ---
    {
        q: "Quelle est la capitale de la Belgique ?",
        choices: ["Bruxelles", "Anvers", "Liège", "Namur"],
        correct: 0,
        explanation: "Bruxelles est la capitale de la Belgique et aussi le siège de l'Union européenne !"
    },
    {
        q: "En quelle année la Belgique est-elle devenue indépendante ?",
        hint: "Indépendante = libre, qui se gouverne toute seule",
        choices: ["1789", "1830", "1914", "1950"],
        correct: 1,
        explanation: "La Belgique est devenue indépendante en 1830 après la révolution contre les Pays-Bas."
    },
    {
        q: "Combien de régions y a-t-il en Belgique ?",
        choices: ["2", "3", "4", "5"],
        correct: 1,
        explanation: "Il y a 3 régions : la Région flamande, la Région wallonne et la Région de Bruxelles-Capitale."
    },
    {
        q: "Quelles sont les 3 langues officielles de la Belgique ?",
        choices: ["Français, anglais, néerlandais", "Français, néerlandais, allemand", "Français, espagnol, néerlandais", "Néerlandais, allemand, anglais"],
        correct: 1,
        explanation: "Les 3 langues officielles sont le français, le néerlandais et l'allemand."
    },
    {
        q: "Qui est le roi actuel de la Belgique (en 2025) ?",
        choices: ["Albert II", "Philippe", "Baudouin", "Léopold III"],
        correct: 1,
        explanation: "Le roi Philippe règne depuis 2013. Son père Albert II a abdiqué."
    },
    {
        q: "Quel est le symbole national de la Belgique ?",
        choices: ["Le coq", "Le lion", "L'aigle", "L'ours"],
        correct: 1,
        explanation: "Le lion est le symbole national de la Belgique, on le retrouve sur les armoiries."
    },
    {
        q: "Quelles sont les couleurs du drapeau belge ?",
        choices: ["Bleu, blanc, rouge", "Noir, jaune, rouge", "Vert, blanc, rouge", "Noir, rouge, blanc"],
        correct: 1,
        explanation: "Le drapeau belge est noir, jaune et rouge, disposé en bandes verticales."
    },
    {
        q: "Quel fleuve traverse Liège ?",
        choices: ["L'Escaut", "La Meuse", "La Seine", "Le Rhin"],
        correct: 1,
        explanation: "La Meuse traverse Liège, Namur et Dinant."
    },
    {
        q: "Quel est le plus grand port de Belgique ?",
        choices: ["Bruxelles", "Liège", "Anvers", "Ostende"],
        correct: 2,
        explanation: "Le port d'Anvers est le plus grand de Belgique et l'un des plus grands d'Europe !"
    },
    {
        q: "Qui a peint le célèbre tableau « Le Fils de l'Homme » avec une pomme ?",
        choices: ["Rubens", "Magritte", "Van Eyck", "Bruegel"],
        correct: 1,
        explanation: "René Magritte, un peintre surréaliste belge, a peint « Le Fils de l'Homme »."
    },
    {
        q: "Quel célèbre personnage de BD belge est un reporter avec une houppe ?",
        choices: ["Spirou", "Lucky Luke", "Tintin", "Gaston Lagaffe"],
        correct: 2,
        explanation: "Tintin, créé par Hergé, est l'un des personnages de BD les plus connus au monde !"
    },
    {
        q: "Qui a créé les Schtroumpfs ?",
        choices: ["Hergé", "Franquin", "Peyo", "Morris"],
        correct: 2,
        explanation: "Peyo (Pierre Culliford), un dessinateur belge, a créé les Schtroumpfs en 1958."
    },
    {
        q: "Quel aliment la Belgique est-elle particulièrement célèbre pour ?",
        choices: ["Les crêpes", "Les frites", "Les tacos", "La pizza"],
        correct: 1,
        explanation: "Les frites belges sont célèbres dans le monde entier ! Lulu adore ça ! 🍟"
    },
    {
        q: "Quelle mer borde la Belgique ?",
        choices: ["La mer Méditerranée", "L'océan Atlantique", "La mer du Nord", "La mer Baltique"],
        correct: 2,
        explanation: "La mer du Nord borde la côte belge (environ 67 km de littoral)."
    },
    {
        q: "Quel événement mondial a eu lieu à Bruxelles en 1958 ?",
        choices: ["Les Jeux Olympiques", "L'Exposition universelle", "La Coupe du Monde", "Le Festival de Cannes"],
        correct: 1,
        explanation: "L'Exposition universelle de 1958 a eu lieu à Bruxelles. L'Atomium a été construit pour l'occasion !"
    },
    // --- CEB extraits : Histoire ---
    {
        q: "Qui était Léopold Ier ?",
        choices: ["Un chef de tribu gauloise", "Le premier Roi des Belges", "Un empereur romain", "Un explorateur"],
        correct: 1,
        explanation: "Léopold Ier est devenu le premier Roi des Belges après l'indépendance de 1830."
    },
    {
        q: "Les Jeux Olympiques d'été modernes ont lieu tous les combien ?",
        choices: ["Tous les ans", "Tous les deux ans", "Tous les trois ans", "Tous les quatre ans"],
        correct: 3,
        explanation: "Les J.O. d'été se déroulent tous les quatre ans. Par exemple : 2012, 2016, 2020, 2024..."
    },
    {
        q: "À quelle période historique appartient Ambiorix, chef gaulois ?",
        choices: ["La Préhistoire", "L'Antiquité", "Le Moyen Âge", "Les Temps modernes"],
        correct: 1,
        explanation: "Ambiorix était un chef de tribu gauloise à l'époque de Jules César, pendant l'Antiquité."
    },
    {
        q: "À quelle période historique appartient Charlemagne ?",
        choices: ["La Préhistoire", "L'Antiquité", "Le Moyen Âge", "Les Temps modernes"],
        correct: 2,
        explanation: "Charlemagne a été couronné empereur en 800 après J.-C., au Moyen Âge."
    },
    {
        q: "Le Traité de Rome a été signé en quelle année ?",
        choices: ["1830", "1914", "1945", "1957"],
        correct: 3,
        explanation: "Le Traité de Rome a été signé en 1957, créant la Communauté économique européenne."
    },
    {
        q: "En 1914, quel événement important a touché la Belgique ?",
        choices: ["L'indépendance", "Le début de la Première Guerre mondiale", "La signature du Traité de Rome", "Le premier vol spatial"],
        correct: 1,
        explanation: "En 1914, la Première Guerre mondiale a commencé. La Belgique a été envahie par l'Allemagne."
    },
    {
        q: "Quel pays a quitté l'Union européenne en 2020 ?",
        choices: ["La France", "Le Royaume-Uni", "L'Italie", "Le Danemark"],
        correct: 1,
        explanation: "Le Royaume-Uni a quitté l'Union européenne en 2020, c'est ce qu'on appelle le Brexit."
    },
    {
        q: "Durant quelle période a-t-on construit des châteaux forts ?",
        choices: ["La Préhistoire", "L'Antiquité", "Le Moyen Âge", "Les Temps modernes"],
        correct: 2,
        explanation: "Les châteaux forts ont été construits au Moyen Âge, à partir du 11e-12e siècle."
    },
    {
        q: "Quel scientifique a défendu l'héliocentrisme ?",
        hint: "Héliocentrisme = théorie qui dit que la Terre tourne autour du Soleil (hélio = soleil)",
        choices: ["Ptolémée", "Edwin Hubble", "Copernic", "Marco Polo"],
        correct: 2,
        explanation: "Nicolas Copernic (1473-1543) a développé la théorie selon laquelle la Terre tourne autour du Soleil."
    },
    {
        q: "Que signifie « géocentrisme » ?",
        hint: "Géo = Terre, centrisme = au centre",
        choices: ["La Terre tourne autour du Soleil", "La Terre est au centre de l'Univers", "La Lune est au centre", "Le Soleil tourne autour de la Lune"],
        correct: 1,
        explanation: "« Géo » = Terre, « centrisme » = centre. Le géocentrisme place la Terre au centre de l'Univers."
    },
    // --- Géographie ---
    {
        q: "Pour aller de Bruxelles à Los Angeles, dans quelle direction voyage-t-on ?",
        choices: ["Vers le nord", "Vers l'ouest", "Vers l'est", "Vers le sud"],
        correct: 1,
        explanation: "Los Angeles se trouve en Amérique, à l'ouest de l'Europe. On traverse l'Atlantique vers l'ouest."
    },
    {
        q: "Quelle est la caractéristique principale d'un désert ?",
        choices: ["Des pentes fortes", "Des arbres partout", "Très peu de pluie", "Une altitude de 0 mètre"],
        correct: 2,
        explanation: "Un désert se caractérise principalement par la rareté des précipitations (très peu de pluie)."
    },
    {
        q: "Quelle province de Belgique a la densité de population la plus basse ?",
        choices: ["Liège", "Le Hainaut", "Le Luxembourg", "Le Brabant wallon"],
        correct: 2,
        explanation: "La province de Luxembourg, au sud, est la moins peuplée car elle est très rurale et boisée."
    },
    {
        q: "Qu'est-ce qu'un confluent ?",
        hint: "Confluent vient de « confluer » = couler ensemble",
        choices: ["Un barrage", "L'endroit où deux cours d'eau se rejoignent", "La source d'un fleuve", "Un pont"],
        correct: 1,
        explanation: "Un confluent est l'endroit où deux cours d'eau se rencontrent, comme la Sambre et la Meuse à Namur."
    },
    {
        q: "Qu'est-ce qu'un pays limitrophe ?",
        hint: "Limitrophe vient de « limite » = frontière, bord",
        choices: ["Un pays très grand", "Un pays de l'UE", "Un pays voisin qui partage une frontière", "Un pays insulaire"],
        correct: 2,
        explanation: "Un pays limitrophe est un pays voisin qui a des frontières communes avec un autre pays."
    },
    {
        q: "La sidérurgie s'est développée en Belgique autour de quelles villes ?",
        hint: "Sidérurgie = industrie qui fabrique l'acier et le fer",
        choices: ["Bruges et Gand", "Charleroi et Liège", "Namur et Arlon", "Bruxelles et Louvain"],
        correct: 1,
        explanation: "Charleroi et Liège sont les grandes villes industrielles de Belgique pour la sidérurgie."
    },
    {
        q: "Qu'est-ce qu'un hypocauste dans une villa romaine ?",
        hint: "Hypo = en dessous, causte = brûler (chauffer par en dessous)",
        choices: ["Un système d'éducation", "Un système d'alimentation", "Un système de divertissement", "Un système de chauffage"],
        correct: 3,
        explanation: "L'hypocauste était un système de chauffage par le sol utilisé par les Romains."
    },
    // --- CEB 2015-2021 : Histoire/Géo ---
    {
        q: "Quel héros de BD belge est né dans la presse en 1929 ?",
        choices: ["Astérix", "Tintin", "Spirou", "Lucky Luke"],
        correct: 1,
        explanation: "Tintin, créé par Hergé, est apparu pour la première fois dans le journal en 1929."
    },
    {
        q: "L'Art nouveau, la BD et le surréalisme sont célèbres dans quel pays ?",
        choices: ["La France", "Les Pays-Bas", "La Belgique", "Le Luxembourg"],
        correct: 2,
        explanation: "La Belgique est connue pour l'Art nouveau (Horta), la BD (Hergé) et le surréalisme (Magritte)."
    },
    {
        q: "Quel célèbre cycliste belge est surnommé « le Cannibale » ?",
        choices: ["Philippe Gilbert", "Tom Boonen", "Eddy Merckx", "Remco Evenepoel"],
        correct: 2,
        explanation: "Eddy Merckx est le plus grand cycliste belge de l'histoire. Il a remporté 5 Tours de France !"
    },
    {
        q: "Pourquoi un même fleuve belge peut s'appeler « Maas » ou « Meuse » ?",
        choices: ["Ce sont deux fleuves différents", "La Belgique a plusieurs langues officielles", "C'est une erreur", "Il change de nom à la frontière"],
        correct: 1,
        explanation: "Le même fleuve s'appelle « Meuse » en français et « Maas » en néerlandais. La Belgique a 3 langues officielles !"
    },
    {
        q: "Dans quelle ville le Tour de France 2019 a-t-il pris son départ ?",
        choices: ["Liège", "Namur", "Bruxelles", "Anvers"],
        correct: 2,
        explanation: "Le Tour de France 2019 a pris son départ à Bruxelles pour fêter les 50 ans de la première victoire d'Eddy Merckx."
    },
    {
        q: "Quel architecte belge est célèbre pour le style Art nouveau ?",
        choices: ["René Magritte", "Victor Horta", "Hergé", "Paul Delvaux"],
        correct: 1,
        explanation: "Victor Horta est célèbre pour ses bâtiments Art nouveau, avec des lignes courbes et beaucoup de lumière."
    },
];

// ===== QUESTIONS CORPS HUMAIN & SCIENCES (Niveau CEB) =====
const QUESTIONS_CORPS = [
    {
        q: "Combien d'os a le corps humain adulte ?",
        choices: ["106", "206", "306", "406"],
        correct: 1,
        explanation: "Le corps humain adulte a 206 os. Les bébés en ont environ 300 qui fusionnent en grandissant !"
    },
    {
        q: "Quel organe pompe le sang dans tout le corps ?",
        choices: ["Les poumons", "Le cerveau", "Le cœur", "Le foie"],
        correct: 2,
        explanation: "Le cœur bat environ 100 000 fois par jour pour envoyer le sang partout ! 💓"
    },
    {
        q: "Par où l'air entre-t-il quand on respire ?",
        choices: ["La bouche et le nez", "Les oreilles", "Les yeux", "La peau"],
        correct: 0,
        explanation: "L'air entre par le nez et la bouche, passe par la trachée et arrive dans les poumons."
    },
    {
        q: "Quel organe nous permet de réfléchir ?",
        choices: ["Le cœur", "L'estomac", "Le cerveau", "Les poumons"],
        correct: 2,
        explanation: "Le cerveau contrôle tout : la pensée, les mouvements, les émotions et même les rêves !"
    },
    {
        q: "Que se passe-t-il dans l'estomac ?",
        choices: ["L'air est filtré", "Les aliments sont digérés", "Le sang est fabriqué", "Les os grandissent"],
        correct: 1,
        explanation: "L'estomac digère les aliments grâce à des sucs gastriques. C'est là que les frites de Lulu sont transformées !"
    },
    {
        q: "Comment s'appellent les petits vaisseaux sanguins très fins ?",
        hint: "Vaisseaux sanguins = tubes dans lesquels le sang circule",
        choices: ["Les artères", "Les veines", "Les capillaires", "Les nerfs"],
        correct: 2,
        explanation: "Les capillaires sont si fins qu'ils sont plus petits qu'un cheveu !"
    },
    {
        q: "Quel sens est lié aux oreilles ?",
        choices: ["La vue", "Le goût", "Le toucher", "L'ouïe"],
        correct: 3,
        explanation: "Les oreilles nous permettent d'entendre les sons et aussi de garder l'équilibre !"
    },
    {
        q: "À quoi servent les poumons ?",
        choices: ["Digérer", "Respirer", "Voir", "Bouger les bras"],
        correct: 1,
        explanation: "Les poumons absorbent l'oxygène et rejettent le CO₂. On respire environ 20 000 fois par jour !"
    },
    {
        q: "Qu'est-ce qui protège nos organes dans la poitrine ?",
        choices: ["La peau", "Les muscles", "Les côtes", "Les cheveux"],
        correct: 2,
        explanation: "Les côtes forment une cage thoracique qui protège le cœur et les poumons."
    },
    {
        q: "De quoi les muscles ont-ils besoin pour fonctionner ?",
        choices: ["De lumière", "D'oxygène et de nourriture", "De froid", "De silence"],
        correct: 1,
        explanation: "Les muscles utilisent l'oxygène et les nutriments de la nourriture pour produire de l'énergie !"
    },
    {
        q: "Quel est le plus grand organe du corps humain ?",
        choices: ["Le foie", "Le cerveau", "La peau", "L'intestin"],
        correct: 2,
        explanation: "La peau est le plus grand organe ! Chez un adulte, elle mesure environ 2 m² !"
    },
    {
        q: "Combien de dents a un adulte ?",
        choices: ["20", "28", "32", "40"],
        correct: 2,
        explanation: "Un adulte a 32 dents (avec les dents de sagesse). Les enfants ont 20 dents de lait."
    },
];

// ===== QUESTIONS FRANÇAIS (Niveau CEB) =====
const QUESTIONS_FRANCAIS = [
    {
        q: "Dans « Le chat mange la souris », quel est le sujet ?",
        choices: ["mange", "la souris", "Le chat", "la"],
        correct: 2,
        explanation: "Le sujet est « Le chat » car c'est lui qui fait l'action de manger."
    },
    {
        q: "Quel est le pluriel de « cheval » ?",
        choices: ["chevals", "chevaux", "cheveaux", "chevales"],
        correct: 1,
        explanation: "Cheval fait chevaux au pluriel. C'est un pluriel irrégulier en -aux !"
    },
    {
        q: "Quel est le contraire de « grand » ?",
        hint: "Contraire (ou antonyme) = mot qui veut dire l'opposé",
        choices: ["gros", "petit", "large", "haut"],
        correct: 1,
        explanation: "Le contraire (antonyme) de grand est petit."
    },
    {
        q: "Comment s'appelle un mot qui remplace un nom ?",
        hint: "Pro = à la place de · Nom = le nom. Un pro-nom remplace un nom",
        choices: ["Un adjectif", "Un verbe", "Un pronom", "Un adverbe"],
        correct: 2,
        explanation: "Un pronom remplace un nom. Exemple : « il » remplace « le garçon »."
    },
    {
        q: "Conjugue « être » au présent avec « nous » :",
        choices: ["Nous sommes", "Nous êtes", "Nous sont", "Nous suis"],
        correct: 0,
        explanation: "Nous sommes ! Le verbe être est irrégulier : je suis, tu es, il est, nous sommes, vous êtes, ils sont."
    },
    {
        q: "Trouve le COD dans : « Lulu mange une frite. »",
        hint: "COD = Complément d'Objet Direct. Pose la question « QUOI ? » après le verbe",
        choices: ["Lulu", "mange", "une frite", "une"],
        correct: 2,
        explanation: "« une frite » est le COD. Lulu mange QUOI ? → une frite."
    },
    {
        q: "Quel type de phrase est : « Viens ici ! » ?",
        hint: "Déclarative = dit quelque chose · Interrogative = pose une question · Impérative = donne un ordre",
        choices: ["Déclarative", "Interrogative", "Exclamative", "Impérative"],
        correct: 3,
        explanation: "C'est une phrase impérative car elle donne un ordre."
    },
    {
        q: "Comment s'appelle le mot qui décrit un nom ?",
        choices: ["Le verbe", "L'adjectif", "L'adverbe", "La conjonction"],
        correct: 1,
        explanation: "L'adjectif qualifie le nom. Exemple : un GRAND jardin, une BELLE fleur."
    },
    {
        q: "Quel est le féminin de « acteur » ?",
        choices: ["Acteuse", "Acteure", "Actrice", "Actresse"],
        correct: 2,
        explanation: "Le féminin d'acteur est actrice."
    },
    {
        q: "Quel temps est « je mangeais » ?",
        choices: ["Présent", "Futur", "Imparfait", "Passé composé"],
        correct: 2,
        explanation: "« je mangeais » est à l'imparfait. La terminaison -ais est un indice !"
    },
    {
        q: "Quel mot est un synonyme de « joyeux » ?",
        hint: "Synonyme = mot qui veut dire la même chose ou presque",
        choices: ["Triste", "Content", "Fatigué", "Calme"],
        correct: 1,
        explanation: "Content est un synonyme de joyeux. Un synonyme a un sens proche."
    },
    {
        q: "Complète : « Les enfants ... au parc. » (aller, présent)",
        choices: ["va", "allons", "vont", "allez"],
        correct: 2,
        explanation: "Les enfants vont au parc. Aller au présent : je vais, tu vas, il va, nous allons, vous allez, ils vont."
    },
    // --- CEB extraits : Français ---
    {
        q: "Qu'est-ce qu'une enluminure ?",
        hint: "Manuscrit = texte écrit à la main, souvent au Moyen Âge",
        choices: ["Une sculpture en pierre", "Une peinture décorant un manuscrit ancien", "Un monument historique", "Un document officiel"],
        correct: 1,
        explanation: "Une enluminure est une peinture ou décoration réalisée à la main dans un manuscrit du Moyen Âge."
    },
    {
        q: "Dans « Les Hollandais ont osé attaquer Bruxelles », quel est le sujet ?",
        choices: ["Bruxelles", "Les Hollandais", "attaquer", "osé"],
        correct: 1,
        explanation: "Le sujet est celui qui fait l'action. Ici, « Les Hollandais » ont osé attaquer."
    },
    {
        q: "Que signifie le préfixe « hélio » dans héliocentrisme ?",
        hint: "Un préfixe = petit mot qu'on met au début pour changer le sens",
        choices: ["Terre", "Soleil", "Lune", "Étoile"],
        correct: 1,
        explanation: "« Hélio » signifie Soleil en grec. L'héliocentrisme = la Terre tourne autour du Soleil."
    },
    {
        q: "Quel est le pluriel de « journal » ?",
        choices: ["journals", "journaux", "journeaux", "journales"],
        correct: 1,
        explanation: "Journal fait journaux au pluriel, comme cheval/chevaux, animal/animaux."
    },
    {
        q: "Quel est le féminin de « boulanger » ?",
        choices: ["Boulangère", "Boulangeuse", "Boulangeresse", "Boulangière"],
        correct: 0,
        explanation: "Le féminin de boulanger est boulangère (comme berger/bergère)."
    },
    {
        q: "Conjugue « avoir » au présent avec « ils » :",
        choices: ["Ils avons", "Ils avez", "Ils ont", "Ils as"],
        correct: 2,
        explanation: "Ils ont ! Le verbe avoir : j'ai, tu as, il a, nous avons, vous avez, ils ont."
    },
    {
        q: "Quel temps est « je chanterai » ?",
        choices: ["Présent", "Futur simple", "Imparfait", "Passé composé"],
        correct: 1,
        explanation: "« je chanterai » est au futur simple. La terminaison -rai est un indice !"
    },
    {
        q: "Quel mot est un homonyme de « ver » ?",
        hint: "Homonyme = mot qui se prononce pareil mais s'écrit différemment et a un sens différent",
        choices: ["Vert", "Verre", "Vers", "Tous ces mots"],
        correct: 3,
        explanation: "Vert, verre et vers sont tous des homonymes de ver. Ils se prononcent pareil mais s'écrivent différemment !"
    },
    // --- CEB 2010-2021 : Français ---
    {
        q: "À quelle classe de mots appartient « quelques » dans « quelques modifications » ?",
        hint: "Déterminant = petit mot placé devant un nom (le, la, un, des, quelques...)",
        choices: ["Adverbe", "Pronom", "Nom", "Déterminant"],
        correct: 3,
        explanation: "« Quelques » est un déterminant indéfini. Il se place devant le nom « modifications »."
    },
    {
        q: "À quelle classe de mots appartient « vieille » dans « la vieille dame » ?",
        choices: ["Nom", "Pronom", "Adjectif", "Verbe"],
        correct: 2,
        explanation: "« Vieille » est un adjectif qualificatif. Il décrit le nom « dame »."
    },
    {
        q: "Quel est l'infinitif du verbe « tiens » dans « je la tiens » ?",
        choices: ["Tienner", "Tenir", "Teindre", "Tendre"],
        correct: 1,
        explanation: "« Je tiens » vient du verbe « tenir », un verbe du 3e groupe."
    },
    {
        q: "À quel temps est « les gens racontaient » ?",
        choices: ["Présent", "Passé composé", "Imparfait", "Futur simple"],
        correct: 2,
        explanation: "« Racontaient » est à l'imparfait. La terminaison -aient est typique de l'imparfait."
    },
    {
        q: "Quelle est l'intention d'un auteur qui écrit un texte documentaire ?",
        hint: "Texte documentaire = texte qui explique des faits réels (encyclopédie, article...)",
        choices: ["Distraire", "Convaincre", "Faire agir", "Informer"],
        correct: 3,
        explanation: "Un texte documentaire a pour but principal d'informer le lecteur."
    },
    {
        q: "Que signifie « travailler d'arrache-pied » ?",
        choices: ["Travailler sans se presser", "Travailler sans jamais s'arrêter", "Travailler sans effort", "Travailler sans s'inquiéter"],
        correct: 1,
        explanation: "« Travailler d'arrache-pied » veut dire travailler très fort, sans relâche !"
    },
    {
        q: "Que signifie « nager en pleine confusion » ?",
        choices: ["Avoir pris des cours de natation", "Ne plus savoir ce qu'on fait", "Se tromper de piscine", "Être un bon nageur"],
        correct: 1,
        explanation: "« Nager en pleine confusion » = être complètement perdu, ne plus rien comprendre."
    },
    {
        q: "Quelle morale pour quelqu'un qui fait tout trop vite sans réfléchir ?",
        choices: ["Qui va lentement va sûrement", "Le travail c'est la santé", "Il ne faut pas confondre vitesse et précipitation", "La routine tue la réflexion"],
        correct: 2,
        explanation: "Aller vite c'est bien, mais agir sans réfléchir (précipitation), c'est une erreur !"
    },
    {
        q: "Que signifie « rester sans descendance » ?",
        choices: ["Ne pas pouvoir descendre", "Ne pas perdre sa place", "Ne pas se faire battre", "Ne pas avoir d'enfants/petits"],
        correct: 3,
        explanation: "La « descendance », ce sont les enfants, les petits. « Sans descendance » = pas de petits."
    },
    {
        q: "Quel type de texte a pour but de « donner du plaisir » au lecteur ?",
        choices: ["Un article de journal", "Une recette de cuisine", "Un conte ou un roman", "Un mode d'emploi"],
        correct: 2,
        explanation: "Un conte ou un roman est écrit pour le plaisir de lire, pour distraire !"
    },
];

// ===== QUESTIONS MATHS (Niveau CEB - adapté dyscalculie) =====
const QUESTIONS_MATH = [
    {
        q: "Combien font 25 + 17 ?",
        choices: ["32", "42", "52", "43"],
        correct: 1,
        explanation: "25 + 17 = 42. Astuce : 25 + 15 = 40, puis + 2 = 42 !"
    },
    {
        q: "Combien font 100 - 37 ?",
        choices: ["73", "63", "67", "53"],
        correct: 1,
        explanation: "100 - 37 = 63. Astuce : 100 - 40 = 60, puis + 3 = 63."
    },
    {
        q: "Combien font 6 × 7 ?",
        choices: ["36", "48", "42", "56"],
        correct: 2,
        explanation: "6 × 7 = 42. 😄"
    },
    {
        q: "Lulu a 48 frites. Elle les partage en 6 parts égales. Combien par part ?",
        choices: ["6", "7", "8", "9"],
        correct: 2,
        explanation: "48 ÷ 6 = 8 frites par part. 🍟"
    },
    {
        q: "Quel est le double de 35 ?",
        choices: ["60", "65", "70", "75"],
        correct: 2,
        explanation: "Double de 35 = 35 + 35 = 70. Astuce : double de 30 = 60, double de 5 = 10, 60 + 10 = 70."
    },
    {
        q: "Quelle est la moitié de 84 ?",
        choices: ["42", "44", "38", "48"],
        correct: 0,
        explanation: "Moitié de 84 = 42. Moitié de 80 = 40, moitié de 4 = 2, 40 + 2 = 42."
    },
    {
        q: "Combien y a-t-il de centimètres dans 1,5 mètre ?",
        choices: ["15 cm", "150 cm", "1 500 cm", "105 cm"],
        correct: 1,
        explanation: "1 mètre = 100 cm, donc 1,5 mètre = 150 cm."
    },
    {
        q: "Corbatin a 3 paquets de 12 biscuits. Combien en tout ?",
        choices: ["32", "36", "42", "15"],
        correct: 1,
        explanation: "3 × 12 = 36 biscuits. 3 × 10 = 30, 3 × 2 = 6, 30 + 6 = 36."
    },
    {
        q: "Quel nombre vient après 999 ?",
        choices: ["9 910", "1 000", "9 100", "10 000"],
        correct: 1,
        explanation: "Après 999 vient 1 000 (mille). C'est un nouveau millier !"
    },
    {
        q: "Combien font 2,5 + 1,5 ?",
        choices: ["3", "3,5", "4", "4,5"],
        correct: 2,
        explanation: "2,5 + 1,5 = 4. Les décimales 0,5 + 0,5 = 1, et 2 + 1 = 3, donc 3 + 1 = 4."
    },
    {
        q: "Quel est le périmètre d'un rectangle de 8 cm de long et 3 cm de large ?",
        hint: "Périmètre = le tour complet d'une figure (la longueur de tous les côtés)",
        choices: ["11 cm", "22 cm", "24 cm", "16 cm"],
        correct: 1,
        explanation: "Périmètre = (longueur + largeur) × 2 = (8 + 3) × 2 = 11 × 2 = 22 cm."
    },
    {
        q: "Quelle fraction est la plus grande ?",
        hint: "Dénominateur = le nombre en bas. Plus il est petit, plus le morceau est grand",
        choices: ["1/4", "1/2", "1/8", "1/3"],
        correct: 1,
        explanation: "1/2 est la plus grande. Plus le dénominateur est petit, plus la part est grande !"
    },
    {
        q: "Lulu a 5 € et achète un chocolat à 2,30 €. Combien reste-t-il ?",
        choices: ["2,30 €", "2,70 €", "3,70 €", "3,30 €"],
        correct: 1,
        explanation: "5 - 2,30 = 2,70 €. On peut calculer : 5 - 2 = 3, puis 3 - 0,30 = 2,70."
    },
    {
        q: "Quel est le quart de 100 ?",
        choices: ["50", "40", "25", "20"],
        correct: 2,
        explanation: "Le quart de 100 = 100 ÷ 4 = 25."
    },
    // --- CEB extraits : Maths ---
    {
        q: "L'année 1957 appartient à quel siècle ?",
        choices: ["18e siècle", "19e siècle", "20e siècle", "21e siècle"],
        correct: 2,
        explanation: "1957 est entre 1901 et 2000, c'est le 20e siècle. Astuce : premiers chiffres + 1."
    },
    {
        q: "L'année 1254 appartient à quel siècle ?",
        choices: ["11e siècle", "12e siècle", "13e siècle", "14e siècle"],
        correct: 2,
        explanation: "1254 est entre 1201 et 1300, c'est le 13e siècle. 12 + 1 = 13e siècle."
    },
    {
        q: "Pierre de Coubertin est né en 1863 et mort en 1937. Quel âge avait-il ?",
        choices: ["64 ans", "74 ans", "84 ans", "94 ans"],
        correct: 1,
        explanation: "1937 - 1863 = 74 ans."
    },
    {
        q: "Annie Cordy est née en 1928 et décédée en 2020. Quel âge environ ?",
        choices: ["82 ans", "88 ans", "92 ans", "96 ans"],
        correct: 2,
        explanation: "2020 - 1928 = 92 ans. Annie Cordy, chanteuse belge, a vécu environ 92 ans."
    },
    {
        q: "Les J.O. de 1996 comptaient 271 épreuves et ceux de 2016 en comptaient 306. Combien d'épreuves en plus ?",
        choices: ["25", "35", "45", "55"],
        correct: 1,
        explanation: "306 - 271 = 35 épreuves en plus !"
    },
    {
        q: "Solvay est né en 1838 et mort en 1922. Combien d'années a-t-il vécu ?",
        choices: ["74 ans", "84 ans", "94 ans", "104 ans"],
        correct: 1,
        explanation: "1922 - 1838 = 84 ans."
    },
    {
        q: "Combien font 8 × 9 ?",
        choices: ["63", "72", "81", "64"],
        correct: 1,
        explanation: "8 × 9 = 72. Astuce : 8 × 10 = 80, 80 - 8 = 72."
    },
    {
        q: "Combien font 456 + 278 ?",
        choices: ["634", "724", "734", "744"],
        correct: 2,
        explanation: "456 + 278 = 734. On additionne : 6+8=14 (retenue), 5+7+1=13 (retenue), 4+2+1=7."
    },
    {
        q: "Un film dure 1h45. S'il commence à 14h20, à quelle heure finit-il ?",
        choices: ["15h55", "16h05", "16h15", "15h65"],
        correct: 1,
        explanation: "14h20 + 1h45 = 14h20 + 1h = 15h20, + 45min = 16h05."
    },
    {
        q: "Combien de minutes dans 2 heures et demie ?",
        choices: ["120 min", "130 min", "150 min", "180 min"],
        correct: 2,
        explanation: "2h30 = 2 × 60 + 30 = 120 + 30 = 150 minutes."
    },
    // --- CEB 2010-2021 : Maths ---
    {
        q: "Quelle unité de mesure utilise-t-on pour la distance entre Bruxelles et Ostende ?",
        choices: ["mm", "m", "l", "km"],
        correct: 3,
        explanation: "Pour les grandes distances entre deux villes, on utilise le kilomètre (km)."
    },
    {
        q: "33 centilitres, c'est environ la capacité de quel objet ?",
        choices: ["Une cuillère à soupe", "Une piscine", "Une canette de soda", "Un seau d'eau"],
        correct: 2,
        explanation: "33 cl (33 centilitres), c'est la contenance classique d'une canette de soda !"
    },
    {
        q: "Un centilitre est combien de fois plus petit qu'un litre ?",
        choices: ["10 fois", "100 fois", "1 000 fois", "2 fois"],
        correct: 1,
        explanation: "Le préfixe « centi » = centième. 1 centilitre = 1/100 de litre."
    },
    {
        q: "25 centimètres = combien de millimètres ?",
        choices: ["2,5 mm", "250 mm", "2 500 mm", "25 000 mm"],
        correct: 1,
        explanation: "1 cm = 10 mm, donc 25 cm = 250 mm."
    },
    {
        q: "Combien de faces a un cube ?",
        choices: ["4", "6", "8", "12"],
        correct: 1,
        explanation: "Un cube a 6 faces carrées : dessus, dessous, devant, derrière, gauche et droite."
    },
    {
        q: "Combien de sommets a un cube ?",
        choices: ["4", "6", "8", "12"],
        correct: 2,
        explanation: "Un cube a 8 sommets (les coins)."
    },
    {
        q: "Combien d'arêtes a un cube ?",
        choices: ["6", "8", "10", "12"],
        correct: 3,
        explanation: "Un cube a 12 arêtes : 4 en haut, 4 en bas, et 4 verticales."
    },
    {
        q: "Combien de faces a une pyramide à base carrée ?",
        choices: ["4", "5", "6", "8"],
        correct: 1,
        explanation: "1 base carrée + 4 triangles = 5 faces."
    },
    {
        q: "Une voiture parcourt 960 km avec un réservoir plein. Il reste 1/4. Combien de km encore ?",
        choices: ["480 km", "240 km", "320 km", "192 km"],
        correct: 1,
        explanation: "Un quart de 960 = 960 ÷ 4 = 240 km."
    },
    {
        q: "Une école compte 480 élèves. 360 font du sport. Quel pourcentage cela représente-t-il ?",
        choices: ["50%", "60%", "75%", "80%"],
        correct: 2,
        explanation: "360 ÷ 480 = 0,75 soit 75%. Les trois quarts des élèves font du sport !"
    },
    {
        q: "Dans une école de 480 élèves, 20% pratiquent la natation. Combien d'élèves nagent ?",
        choices: ["48", "80", "96", "120"],
        correct: 2,
        explanation: "20% de 480 = 480 × 20 ÷ 100 = 96 élèves."
    },
    {
        q: "Lulu a 800 perles à ranger dans des boîtes de 30. Elle a rempli 26 boîtes. Combien de perles reste-t-il ?",
        choices: ["10", "20", "30", "40"],
        correct: 1,
        explanation: "26 × 30 = 780 perles. 800 - 780 = 20 perles restantes."
    },
    {
        q: "Combien d'axes de symétrie a un triangle équilatéral ?",
        hint: "Équilatéral = tous les côtés ont la même longueur · Axe de symétrie = ligne qui coupe la figure en 2 parties identiques",
        choices: ["0", "1", "2", "3"],
        correct: 3,
        explanation: "Un triangle équilatéral a 3 axes de symétrie, un par sommet vers le milieu du côté opposé."
    },
    {
        q: "72 élèves reçoivent chacun 1 pomme. Il y a 4 pommes par kg et le kg coûte 1,50 €. Combien paie-t-on ?",
        choices: ["18 €", "27 €", "36 €", "72 €"],
        correct: 1,
        explanation: "72 ÷ 4 = 18 kg. 18 × 1,50 = 27 €."
    },
    {
        q: "Un coureur parcourt 100 m en 10 secondes. Quelle vitesse en km/h ?",
        choices: ["10 km/h", "24 km/h", "36 km/h", "100 km/h"],
        correct: 2,
        explanation: "100 m en 10 s = 10 m/s. En km/h : 10 × 3,6 = 36 km/h."
    },
    {
        q: "Un tour de piste fait 400 m. Combien de tours faut-il pour parcourir 800 m ?",
        choices: ["1 tour", "2 tours", "3 tours", "4 tours"],
        correct: 1,
        explanation: "800 ÷ 400 = 2 tours."
    },
    // --- Problèmes contextualisés ---
    {
        q: "Lulu vend des places pour son concert à 3 € chacune. Elle en vend 45. Combien gagne-t-elle ?",
        choices: ["115 €", "125 €", "135 €", "145 €"],
        correct: 2,
        explanation: "45 × 3 = 135 €. Astuce : 40 × 3 = 120, 5 × 3 = 15, 120 + 15 = 135."
    },
    {
        q: "Corbatin ramasse 156 noisettes en 3 jours. Combien en moyenne par jour ?",
        choices: ["42", "48", "52", "56"],
        correct: 2,
        explanation: "156 ÷ 3 = 52 noisettes par jour."
    },
    {
        q: "Mamande prépare 4 tartes. Chaque tarte nécessite 250 g de farine. Combien de farine au total ?",
        choices: ["750 g", "900 g", "1 000 g", "1 200 g"],
        correct: 2,
        explanation: "4 × 250 = 1 000 g (soit 1 kg)."
    },
    {
        q: "Un train part de Bruxelles à 9h15 et arrive à Liège à 10h27. Combien de temps dure le trajet ?",
        choices: ["1h02", "1h12", "1h22", "1h27"],
        correct: 1,
        explanation: "De 9h15 à 10h15 = 1h, puis de 10h15 à 10h27 = 12 min. Total = 1h12."
    },
    {
        q: "Lulu mesure 1,52 m. Corbatin (sur sa tête) ajoute 38 cm. Quelle hauteur totale ?",
        choices: ["1,80 m", "1,88 m", "1,90 m", "1,92 m"],
        correct: 2,
        explanation: "1,52 m = 152 cm. 152 + 38 = 190 cm = 1,90 m."
    },
    {
        q: "Une classe de 28 élèves part en excursion. Le bus coûte 196 €. Combien par élève ?",
        choices: ["6 €", "7 €", "8 €", "9 €"],
        correct: 1,
        explanation: "196 ÷ 28 = 7 €. Astuce : 28 × 7 = 196."
    },
    {
        q: "Lulu achète 3 baguettes à 1,20 € et 2 croissants à 1,50 €. Combien paie-t-elle ?",
        choices: ["5,40 €", "5,60 €", "6,60 €", "7,20 €"],
        correct: 2,
        explanation: "3 × 1,20 = 3,60 et 2 × 1,50 = 3,00. Total = 3,60 + 3,00 = 6,60 €."
    },
    {
        q: "Corbatin a lu 3/5 de son livre de 120 pages. Combien de pages a-t-il lues ?",
        hint: "Pour calculer 3/5 de 120 : divise 120 par 5, puis multiplie par 3",
        choices: ["60", "72", "80", "90"],
        correct: 1,
        explanation: "120 ÷ 5 = 24, puis 24 × 3 = 72 pages."
    },
    {
        q: "Un jardin rectangulaire fait 12 m de long et 8 m de large. Quelle est son aire ?",
        hint: "Aire du rectangle = Longueur × largeur",
        choices: ["40 m²", "80 m²", "96 m²", "120 m²"],
        correct: 2,
        explanation: "Aire = 12 × 8 = 96 m²."
    },
    {
        q: "Lulu a 50 € et dépense 30%. Combien lui reste-t-il ?",
        hint: "30% de 50 = ce qu'elle dépense. Le reste = 50 moins ça.",
        choices: ["15 €", "25 €", "35 €", "40 €"],
        correct: 2,
        explanation: "30% de 50 = 15 €. Reste : 50 - 15 = 35 €."
    },
    {
        q: "Mamande fait une recette pour 4 personnes avec 200 g de beurre. Pour 6 personnes, combien de beurre ?",
        choices: ["250 g", "280 g", "300 g", "350 g"],
        correct: 2,
        explanation: "200 g ÷ 4 = 50 g par personne. 50 × 6 = 300 g."
    },
    {
        q: "Corbatin court à 8 km/h. Combien de temps met-il pour parcourir 4 km ?",
        hint: "Temps = distance ÷ vitesse",
        choices: ["20 min", "30 min", "45 min", "1 h"],
        correct: 1,
        explanation: "4 ÷ 8 = 0,5 heure = 30 minutes."
    },
];

// ===== FICHES FORMULES MATHS =====
const MATH_FORMULAS = [
    { category: "Géométrie", title: "Aire du rectangle", formula: "Aire = Longueur × largeur", example: "Ex : 5 cm × 3 cm = 15 cm²" },
    { category: "Géométrie", title: "Aire du carré", formula: "Aire = côté × côté", example: "Ex : 4 cm × 4 cm = 16 cm²" },
    { category: "Géométrie", title: "Aire du triangle", formula: "Aire = (base × hauteur) ÷ 2", example: "Ex : (6 × 4) ÷ 2 = 12 cm²" },
    { category: "Géométrie", title: "Périmètre du rectangle", formula: "P = (L + l) × 2", example: "Ex : (8 + 3) × 2 = 22 cm" },
    { category: "Géométrie", title: "Périmètre du carré", formula: "P = côté × 4", example: "Ex : 5 × 4 = 20 cm" },
    { category: "Géométrie", title: "Périmètre du cercle", formula: "P = diamètre × π (≈ 3,14)", example: "Ex : 10 × 3,14 = 31,4 cm" },
    { category: "Géométrie", title: "Aire du cercle", formula: "Aire = rayon × rayon × π", example: "Ex : 5 × 5 × 3,14 = 78,5 cm²" },
    { category: "Solides", title: "Cube", formula: "6 faces · 8 sommets · 12 arêtes", example: "Toutes les faces sont des carrés" },
    { category: "Solides", title: "Pyramide (base carrée)", formula: "5 faces · 5 sommets · 8 arêtes", example: "1 base carrée + 4 triangles" },
    { category: "Conversions", title: "Longueurs", formula: "1 km = 1 000 m = 100 000 cm", example: "1 m = 100 cm = 1 000 mm" },
    { category: "Conversions", title: "Masses", formula: "1 kg = 1 000 g", example: "1 tonne = 1 000 kg" },
    { category: "Conversions", title: "Capacités", formula: "1 L = 100 cL = 1 000 mL", example: "1 dL = 10 cL" },
    { category: "Conversions", title: "Temps", formula: "1 h = 60 min = 3 600 s", example: "1 jour = 24 h · 1 an = 365 jours" },
    { category: "Fractions", title: "Fraction = division", formula: "3/4 = 3 ÷ 4 = 0,75", example: "Le haut = numérateur · Le bas = dénominateur" },
    { category: "Fractions", title: "Additionner des fractions", formula: "Même dénominateur : a/c + b/c = (a+b)/c", example: "Ex : 2/5 + 1/5 = 3/5" },
    { category: "Fractions", title: "Équivalences fractions / %", formula: "1/2 = 50% · 1/4 = 25% · 3/4 = 75%", example: "1/5 = 20% · 1/10 = 10%" },
    { category: "Pourcentages", title: "Calculer un pourcentage", formula: "X% de N = N × X ÷ 100", example: "Ex : 20% de 80 = 80 × 20 ÷ 100 = 16" },
    { category: "Calcul", title: "Double et moitié", formula: "Double = × 2 · Moitié = ÷ 2", example: "Double de 35 = 70 · Moitié de 84 = 42" },
    { category: "Calcul", title: "Priorité des opérations", formula: "D'abord × et ÷ , puis + et −", example: "3 + 2 × 4 = 3 + 8 = 11 (pas 20 !)" },
    { category: "Calcul", title: "Moyenne", formula: "Moyenne = somme ÷ nombre de valeurs", example: "Ex : (8 + 12 + 10) ÷ 3 = 10" },
];

// ===== QUESTIONS SCIENCES (séparées du corps humain) =====
const QUESTIONS_SCIENCES = [
    { q: "Dans l'hémisphère nord, quel jour de l'année est le plus long ?", hint: "Solstice = jour le plus long ou le plus court", choices: ["L'équinoxe d'automne", "Le solstice d'hiver", "L'équinoxe de printemps", "Le solstice d'été"], correct: 3, explanation: "Le solstice d'été (vers le 21 juin) est le jour le plus long." },
    { q: "Dans l'hémisphère nord, quel jour est le plus court ?", hint: "Solstice = jour le plus long ou le plus court", choices: ["Le solstice d'hiver", "L'équinoxe d'automne", "Le solstice d'été", "L'équinoxe de printemps"], correct: 0, explanation: "Le solstice d'hiver (vers le 21 décembre) est le jour le plus court." },
    { q: "Quand c'est l'été en Belgique, quelle saison est-ce en Australie ?", choices: ["L'été aussi", "Le printemps", "L'hiver", "L'automne"], correct: 2, explanation: "Les saisons sont inversées entre les deux hémisphères !" },
    { q: "Qu'est-ce que la moisson ?", hint: "Céréales = blé, orge, maïs...", choices: ["Planter des graines", "Récolter les céréales", "Arroser les champs", "Couper du bois"], correct: 1, explanation: "La moisson = récolter les céréales comme le blé ou l'orge." },
    { q: "Pourquoi la forêt est-elle importante pour la planète ?", choices: ["Elle produit du pétrole", "Elle réduit les gaz à effet de serre", "Elle augmente la température", "Elle empêche la pluie"], correct: 1, explanation: "La forêt absorbe le CO₂ et réduit les gaz à effet de serre." },
    { q: "Vers quel continent les oiseaux migrateurs de Belgique s'envolent-ils ?", choices: ["L'Amérique", "L'Asie", "L'Afrique", "L'Océanie"], correct: 2, explanation: "Les oiseaux migrateurs de Belgique migrent vers l'Afrique pour l'hiver." },
    { q: "À quelle saison les oiseaux migrateurs quittent-ils la Belgique ?", choices: ["Au printemps", "En été", "En automne", "En hiver"], correct: 2, explanation: "En automne, ils partent vers le sud." },
    { q: "Qu'est-ce que la pollinisation ?", hint: "Étamines = partie mâle · Pistil = partie femelle · Pollen = poudre jaune", choices: ["La fabrication du pollen", "Le transport du pollen des étamines vers le pistil", "La transformation de la graine en fruit", "La formation des graines"], correct: 1, explanation: "Le pollen voyage des étamines vers le pistil. Les abeilles aident !" },
    { q: "Que contient en réalité une bouteille « vide » ?", choices: ["Du vide total", "De l'air", "De la poussière", "De la vapeur d'eau"], correct: 1, explanation: "Une bouteille « vide » contient de l'air, un gaz invisible." },
    { q: "Quand on chauffe l'air dans une bouteille fermée avec un ballon, que se passe-t-il ?", choices: ["Rien", "Le ballon gonfle car l'air se dilate", "Le ballon éclate", "La bouteille éclate"], correct: 1, explanation: "L'air se dilate (prend plus de place) sous l'effet de la chaleur." },
    { q: "Quels éléments favorisent le développement des moisissures sur le pain ?", choices: ["La lumière seule", "L'humidité et la chaleur", "L'oxygène seul", "Le type d'aliment seul"], correct: 1, explanation: "Les moisissures aiment la chaleur et l'humidité." },
    { q: "Quel instrument mesure l'humidité de l'air ?", hint: "Hygro = humidité · Thermo = chaleur · Baro = pression", choices: ["Un thermomètre", "Un hygromètre", "Un baromètre", "Une girouette"], correct: 1, explanation: "L'hygromètre mesure l'humidité." },
    { q: "Quel instrument mesure la pression atmosphérique ?", hint: "Pression atmosphérique = le poids de l'air · Anémo = vent", choices: ["Un thermomètre", "Un hygromètre", "Un baromètre", "Un anémomètre"], correct: 2, explanation: "Le baromètre mesure la pression atmosphérique." },
    { q: "Pourquoi l'eau de mer est-elle salée ?", choices: ["À cause des poissons", "Les rivières dissolvent les minéraux des roches", "On y a ajouté du sel", "À cause de la température"], correct: 1, explanation: "Les rivières déposent des sels dans la mer depuis des millions d'années." },
    { q: "Dans le cycle de vie d'une plante, quel est l'ordre correct ?", choices: ["Germination, floraison, pollinisation, fécondation, fruit", "Floraison, germination, fécondation, pollinisation, fruit", "Pollinisation, germination, floraison, fruit", "Germination, pollinisation, floraison, fruit"], correct: 0, explanation: "Germination → floraison → pollinisation → fécondation → fruit !" },
];

// ===== FICHES RÉVISION PAR MATIÈRE =====
const REVISION_FICHES = {
    histoire: [
        { title: "Indépendance belge", content: "1830 — Révolution contre les Pays-Bas", detail: "Premier roi : Léopold Ier" },
        { title: "3 Régions", content: "Flamande · Wallonne · Bruxelles-Capitale", detail: "3 langues : français, néerlandais, allemand" },
        { title: "Drapeau belge", content: "Noir · Jaune · Rouge (vertical)", detail: "Symbole national : le lion" },
        { title: "Époques historiques", content: "Préhistoire → Antiquité → Moyen Âge → Temps modernes → Contemp.", detail: "Charlemagne = Moyen Âge · Ambiorix = Antiquité" },
        { title: "Guerres mondiales", content: "1914-1918 (1re) · 1939-1945 (2e)", detail: "La Belgique a été envahie en 1914" },
        { title: "Europe", content: "Traité de Rome 1957 → CEE → Union européenne", detail: "Brexit (Royaume-Uni) en 2020" },
        { title: "BD belge", content: "Tintin (Hergé, 1929) · Schtroumpfs (Peyo, 1958)", detail: "Spirou (Franquin) · Lucky Luke (Morris)" },
        { title: "Villes & Fleuves", content: "Meuse : Liège, Namur, Dinant", detail: "Port d'Anvers = plus grand de Belgique" },
        { title: "Culture belge", content: "Magritte (surréalisme) · Horta (Art nouveau)", detail: "Eddy Merckx = « le Cannibale » (cyclisme)" },
        { title: "Atomium", content: "Construit pour l'Expo universelle de 1958", detail: "Symbole de Bruxelles" },
    ],
    corps: [
        { title: "Squelette", content: "206 os chez l'adulte · 300 chez le bébé", detail: "Fémur = os le plus long" },
        { title: "Cœur", content: "Pompe le sang · ~100 000 battements/jour", detail: "Protégé par les côtes (cage thoracique)" },
        { title: "Poumons", content: "Respiration : O₂ entre, CO₂ sort", detail: "~20 000 respirations par jour" },
        { title: "Cerveau", content: "Contrôle tout : pensée, mouvement, émotions", detail: "Protégé par le crâne" },
        { title: "Digestion", content: "Bouche → Estomac → Intestins", detail: "Les sucs gastriques digèrent les aliments" },
        { title: "Articulations", content: "Sphérique : épaule, hanche (tous les sens)", detail: "Charnière : coude, genou (plier/tendre)" },
        { title: "Peau", content: "Plus grand organe du corps (~2 m²)", detail: "Protège, régule la température" },
        { title: "Dents", content: "Enfant : 20 dents de lait · Adulte : 32 dents", detail: "Incisives, canines, prémolaires, molaires" },
        { title: "Muscles", content: "Ont besoin d'oxygène et de nourriture", detail: "Diaphragme = muscle de la respiration" },
        { title: "Sang", content: "Artères (du cœur) · Veines (vers le cœur)", detail: "Capillaires = plus fins qu'un cheveu" },
    ],
    sciences: [
        { title: "Saisons", content: "Solstice d'été (21 juin) = jour le plus long", detail: "Saisons inversées entre hémisphères nord et sud" },
        { title: "Migration", content: "Oiseaux partent en automne vers l'Afrique", detail: "Hirondelle, cigogne, coucou..." },
        { title: "Pollinisation", content: "Pollen va des étamines (♂) au pistil (♀)", detail: "Grâce aux abeilles, au vent, à l'eau" },
        { title: "Cycle plante", content: "Germination → Floraison → Pollinisation → Fruit", detail: "La graine germe, la plante pousse, fleurit, fructifie" },
        { title: "Air", content: "Gaz invisible · Se dilate quand chauffé", detail: "Une bouteille « vide » contient de l'air" },
        { title: "Moisissures", content: "Se développent avec chaleur + humidité", detail: "Conserver au frigo pour éviter" },
        { title: "Instruments météo", content: "Thermomètre (T°) · Hygromètre (humidité)", detail: "Baromètre (pression) · Anémomètre (vent)" },
        { title: "Eau de mer", content: "Salée par les minéraux des roches", detail: "Apportés par les rivières depuis des millions d'années" },
        { title: "Forêt", content: "Absorbe le CO₂ · Réduit effet de serre", detail: "Habitat pour des millions d'espèces" },
    ],
    francais: [
        { title: "Classes de mots", content: "Nom · Verbe · Adjectif · Adverbe", detail: "Déterminant · Pronom · Conjonction · Préposition" },
        { title: "Sujet du verbe", content: "QUI fait l'action ? → C'est le sujet", detail: "Le chat mange. → Sujet = Le chat" },
        { title: "COD", content: "Le verbe + QUOI ? → COD", detail: "Lulu mange une frite → COD = une frite" },
        { title: "Types de phrases", content: "Déclarative · Interrogative · Exclamative · Impérative", detail: "Impérative = donne un ordre (Viens ici !)" },
        { title: "Temps de conjugaison", content: "Présent · Imparfait (-ais) · Futur (-rai)", detail: "Passé composé = avoir/être + participe passé" },
        { title: "Être (présent)", content: "je suis · tu es · il est", detail: "nous sommes · vous êtes · ils sont" },
        { title: "Avoir (présent)", content: "j'ai · tu as · il a", detail: "nous avons · vous avez · ils ont" },
        { title: "Pluriels irréguliers", content: "cheval → chevaux · journal → journaux", detail: "animal → animaux · travail → travaux" },
        { title: "Homonymes", content: "Mots qui se prononcent pareil, sens différent", detail: "ver / vert / verre / vers" },
        { title: "Synonymes & Antonymes", content: "Synonyme = même sens (joyeux = content)", detail: "Antonyme = contraire (grand ≠ petit)" },
    ],
};

// ===== MEMO CARDS (paires emoji / thème éducatif) =====
// Mémo : paires identiques (emoji + mot) — vocabulaire éducatif
const MEMO_THEMES = [
    {
        name: "Corps Humain",
        pairs: [
            { id: "coeur", emoji: "❤️", label: "Cœur" },
            { id: "cerveau", emoji: "🧠", label: "Cerveau" },
            { id: "os", emoji: "🦴", label: "Os" },
            { id: "poumon", emoji: "🫁", label: "Poumon" },
            { id: "muscle", emoji: "💪", label: "Muscle" },
            { id: "dent", emoji: "🦷", label: "Dent" },
            { id: "oeil", emoji: "👁️", label: "Œil" },
            { id: "oreille", emoji: "👂", label: "Oreille" },
        ]
    },
    {
        name: "Sciences & Nature",
        pairs: [
            { id: "soleil", emoji: "☀️", label: "Soleil" },
            { id: "lune", emoji: "🌙", label: "Lune" },
            { id: "arbre", emoji: "🌳", label: "Forêt" },
            { id: "eau", emoji: "💧", label: "Eau" },
            { id: "fleur", emoji: "🌸", label: "Pollinisation" },
            { id: "oiseau", emoji: "🐦", label: "Migration" },
            { id: "thermo", emoji: "🌡️", label: "Thermomètre" },
            { id: "nuage", emoji: "☁️", label: "Météo" },
        ]
    },
    {
        name: "Belgique",
        pairs: [
            { id: "frite", emoji: "🍟", label: "Frites" },
            { id: "choco", emoji: "🍫", label: "Chocolat" },
            { id: "gaufre", emoji: "🧇", label: "Gaufre" },
            { id: "lion", emoji: "🦁", label: "Lion belge" },
            { id: "bd", emoji: "📖", label: "BD belge" },
            { id: "atomium", emoji: "⚛️", label: "Atomium" },
            { id: "drapeau", emoji: "🇧🇪", label: "Belgique" },
            { id: "diamant", emoji: "💎", label: "Anvers" },
        ]
    },
    {
        name: "Géométrie",
        pairs: [
            { id: "carre", emoji: "⬜", label: "Carré" },
            { id: "triangle", emoji: "🔺", label: "Triangle" },
            { id: "cercle", emoji: "⭕", label: "Cercle" },
            { id: "cube", emoji: "🧊", label: "Cube" },
            { id: "regle", emoji: "📏", label: "Périmètre" },
            { id: "angle", emoji: "📐", label: "Angle droit" },
            { id: "symetrie", emoji: "🪞", label: "Symétrie" },
            { id: "pyramide", emoji: "🔺", label: "Pyramide" },
        ]
    },
    {
        name: "Temps de conjugaison",
        pairs: [
            { id: "present", emoji: "⏺️", label: "Présent" },
            { id: "imparfait", emoji: "⏪", label: "Imparfait" },
            { id: "futur", emoji: "⏩", label: "Futur simple" },
            { id: "pc", emoji: "✅", label: "Passé composé" },
            { id: "pqp", emoji: "⏮️", label: "Plus-que-parfait" },
            { id: "fa", emoji: "⏭️", label: "Futur antérieur" },
            { id: "cond", emoji: "❓", label: "Conditionnel" },
            { id: "subj", emoji: "🤔", label: "Subjonctif" },
        ]
    },
    {
        name: "Opérations maths",
        pairs: [
            { id: "add", emoji: "➕", label: "Addition" },
            { id: "sous", emoji: "➖", label: "Soustraction" },
            { id: "mult", emoji: "✖️", label: "Multiplication" },
            { id: "div", emoji: "➗", label: "Division" },
            { id: "frac", emoji: "½", label: "Fraction" },
            { id: "pct", emoji: "%", label: "Pourcentage" },
            { id: "carre", emoji: "²", label: "Au carré" },
            { id: "racine", emoji: "√", label: "Racine carrée" },
        ]
    },
    {
        name: "Sciences & Nature",
        pairs: [
            { id: "herbe", emoji: "🌱", label: "Germination" },
            { id: "fleur", emoji: "🌸", label: "Pollinisation" },
            { id: "arbre", emoji: "🌳", label: "Photosynthèse" },
            { id: "goutte", emoji: "💧", label: "Cycle de l'eau" },
            { id: "soleil", emoji: "☀️", label: "Solstice" },
            { id: "thermo", emoji: "🌡️", label: "Température" },
            { id: "vent", emoji: "🌬️", label: "Anémomètre" },
            { id: "nuage", emoji: "🌧️", label: "Précipitations" },
        ]
    },
    {
        name: "Instruments de musique",
        pairs: [
            { id: "guitar", emoji: "🎸", label: "Guitare" },
            { id: "drums", emoji: "🥁", label: "Batterie" },
            { id: "micro", emoji: "🎤", label: "Micro" },
            { id: "piano", emoji: "🎹", label: "Piano" },
            { id: "saxo", emoji: "🎷", label: "Saxophone" },
            { id: "violon", emoji: "🎻", label: "Violon" },
            { id: "casque", emoji: "🎧", label: "Casque" },
            { id: "note", emoji: "🎵", label: "Note" },
        ]
    },
];

// ===== CONJUGAISON AVENTURE =====
// Phrases à compléter avec le bon temps verbal, dans un contexte d'histoire
const CONJUGAISON_AVENTURE = [
    // Présent
    { story: "Lulu est dans le jardin. Elle ___ de la batterie.", choices: ["jouait", "joue", "jouera", "a joué"], correct: 1, temps: "présent", explanation: "C'est maintenant → présent : elle joue." },
    { story: "Corbatin ___ sur la branche et observe les étoiles.", choices: ["se perchait", "se perche", "se perchera", "s'est perché"], correct: 1, temps: "présent", explanation: "Il est en train de le faire → présent." },
    { story: "Les enfants ___ leurs devoirs avant de jouer.", choices: ["faisaient", "font", "feront", "ont fait"], correct: 1, temps: "présent", explanation: "C'est une habitude actuelle → présent : ils font." },
    { story: "Tu ___ très bien la guitare flamenca !", choices: ["jouais", "joues", "joueras", "as joué"], correct: 1, temps: "présent", explanation: "C'est vrai maintenant → présent : tu joues." },

    // Imparfait
    { story: "Quand Lulu était petite, elle ___ des chansons toute la journée.", choices: ["chante", "chantait", "chantera", "a chanté"], correct: 1, temps: "imparfait", explanation: "C'était une habitude dans le passé → imparfait : elle chantait." },
    { story: "Avant, Corbatin ___ peur du noir.", choices: ["a", "avait", "aura", "a eu"], correct: 1, temps: "imparfait", explanation: "C'était vrai autrefois → imparfait : il avait." },
    { story: "Tous les étés, ils ___ des vacances à la mer.", choices: ["passent", "passaient", "passeront", "ont passé"], correct: 1, temps: "imparfait", explanation: "Habitude répétée dans le passé → imparfait." },

    // Futur simple
    { story: "Demain, Lulu ___ un concert dans le jardin.", choices: ["donne", "donnait", "donnera", "a donné"], correct: 2, temps: "futur simple", explanation: "Demain = dans le futur → futur simple : elle donnera." },
    { story: "L'année prochaine, nous ___ en Espagne.", choices: ["allons", "allions", "irons", "sommes allés"], correct: 2, temps: "futur simple", explanation: "L'année prochaine → futur simple : nous irons." },
    { story: "Quand tu ___ grand, tu pourras voyager seul.", choices: ["es", "étais", "seras", "as été"], correct: 2, temps: "futur simple", explanation: "Quand tu seras (futur) → futur simple." },

    // Passé composé
    { story: "Hier, Corbatin ___ un trésor dans le jardin.", choices: ["trouve", "trouvait", "trouvera", "a trouvé"], correct: 3, temps: "passé composé", explanation: "Hier, action terminée → passé composé : il a trouvé." },
    { story: "Ce matin, Lulu ___ un gâteau au chocolat.", choices: ["prépare", "préparait", "préparera", "a préparé"], correct: 3, temps: "passé composé", explanation: "Ce matin, c'est fini → passé composé." },
    { story: "Les élèves ___ leur examen la semaine dernière.", choices: ["passent", "passaient", "passeront", "ont passé"], correct: 3, temps: "passé composé", explanation: "La semaine dernière → passé composé : ils ont passé." },

    // Mélangés avec indices contextuels
    { story: "En ce moment, Mamande ___ une histoire à ses enfants.", choices: ["racontait", "raconte", "racontera", "a raconté"], correct: 1, temps: "présent", explanation: "En ce moment → présent : elle raconte." },
    { story: "Quand j'___ petit, je croyais que la lune me suivait.", choices: ["suis", "étais", "serai", "ai été"], correct: 1, temps: "imparfait", explanation: "Quand j'étais petit = souvenir → imparfait." },
    { story: "Après les vacances, les enfants ___ à l'école.", choices: ["retournent", "retournaient", "retourneront", "sont retournés"], correct: 2, temps: "futur simple", explanation: "Après les vacances (pas encore) → futur simple." },
];

// ===== BESCHERELLE (trier les phrases par temps) =====
const BESCHERELLE_PHRASES = [
    // Présent
    { phrase: "Lulu joue de la batterie.", temps: "present", indice: "joue = présent" },
    { phrase: "Nous sommes en Belgique.", temps: "present", indice: "sommes = être au présent" },
    { phrase: "Tu manges des frites.", temps: "present", indice: "manges = manger au présent" },
    { phrase: "Les oiseaux chantent dans le jardin.", temps: "present", indice: "chantent = présent" },
    { phrase: "Il fait beau aujourd'hui.", temps: "present", indice: "fait = faire au présent" },
    { phrase: "Je lis un livre de Tintin.", temps: "present", indice: "lis = lire au présent" },
    // Passé (imparfait + passé composé)
    { phrase: "Corbatin dormait sur la branche.", temps: "passe", indice: "dormait = imparfait (-ait)" },
    { phrase: "Hier, j'ai mangé une gaufre.", temps: "passe", indice: "ai mangé = passé composé" },
    { phrase: "Nous avons visité Bruxelles.", temps: "passe", indice: "avons visité = passé composé" },
    { phrase: "Quand j'étais petit, je jouais dehors.", temps: "passe", indice: "étais, jouais = imparfait (-ais)" },
    { phrase: "Elle a chanté toute la soirée.", temps: "passe", indice: "a chanté = passé composé" },
    { phrase: "Les chevaliers construisaient des châteaux.", temps: "passe", indice: "construisaient = imparfait (-aient)" },
    { phrase: "Tu as réussi ton examen.", temps: "passe", indice: "as réussi = passé composé" },
    // Futur
    { phrase: "Demain, je partirai en vacances.", temps: "futur", indice: "partirai = futur simple (-rai)" },
    { phrase: "Nous irons à la mer cet été.", temps: "futur", indice: "irons = aller au futur (-rons)" },
    { phrase: "Tu seras un grand musicien.", temps: "futur", indice: "seras = être au futur (-ras)" },
    { phrase: "Lulu donnera un concert vendredi.", temps: "futur", indice: "donnera = futur simple (-ra)" },
    { phrase: "Les élèves finiront leurs devoirs.", temps: "futur", indice: "finiront = futur simple (-ront)" },
    { phrase: "Il fera froid en hiver.", temps: "futur", indice: "fera = faire au futur (-ra)" },
];

// ===== MINI DICTÉE (histoires de Mamande) =====
const MINI_DICTEE = [
    { texte: "Mamande raconte : « Il était une fois une petite fille qui ___ dans un grand jardin. »", choices: ["jouais", "jouait", "jouer", "jouée"], correct: 1, explanation: "Elle jouait (imparfait, 3e personne) → -ait" },
    { texte: "« Chaque soir, Mamande ___ des crêpes pour ses enfants. »", choices: ["prépare", "prépares", "prépart", "préparre"], correct: 0, explanation: "Elle prépare → 3e personne singulier, pas de -s" },
    { texte: "« Les enfants ___ jouer dans la cour après l'école. »", choices: ["son allé", "sont allés", "sont allez", "son aller"], correct: 1, explanation: "Ils sont allés → sont (verbe être) + allés (avec -s car pluriel)" },
    { texte: "« Lulu a ___ sa chambre avant de sortir. »", choices: ["rangé", "ranger", "rangée", "rangés"], correct: 0, explanation: "Lulu a rangé → participe passé avec avoir, pas d'accord (COD après)" },
    { texte: "« Corbatin ___ de la branche et s'est fait mal. »", choices: ["et tombé", "est tomber", "est tombé", "ai tombé"], correct: 2, explanation: "Il est tombé → être + participe passé (tombé avec -é)" },
    { texte: "« Il y ___ beaucoup de monde au marché. »", choices: ["avait", "avais", "avai", "aver"], correct: 0, explanation: "Il y avait → imparfait de avoir, 3e personne → -ait" },
    { texte: "« Mamande ___ toujours dit : soyez gentils ! »", choices: ["à", "a", "as", "ah"], correct: 1, explanation: "Elle a dit → a (verbe avoir). À = préposition (à la maison)." },
    { texte: "« Les frites ___ prêtes ! À table ! »", choices: ["son", "sont", "sons", "s'ont"], correct: 1, explanation: "Les frites sont → sont (verbe être). Son = son chapeau (possessif)." },
    { texte: "« Lulu ___ sa guitare sur ___ lit. »", choices: ["a posé / son", "à posé / sont", "a poser / son", "a posé / sont"], correct: 0, explanation: "a posé (verbe) / son lit (possessif). À = préposition, sont = verbe être." },
    { texte: "« C'___ une belle journée pour jouer dehors. »", choices: ["est", "es", "ai", "et"], correct: 0, explanation: "C'est → c'est (être). Et = conjonction (Lulu et Corbatin)." },
    { texte: "« Mamande leur ___ de bien se couvrir. »", choices: ["a dit", "à dit", "a dis", "à dis"], correct: 0, explanation: "a dit → a (verbe avoir) + dit (participe passé de dire)" },
    { texte: "« Les enfants ___ leurs manteaux et ___ partis. »", choices: ["on mis / son", "ont mis / sont", "on mit / sont", "ont mit / son"], correct: 1, explanation: "Ils ont mis (avoir) et sont partis (être). On = pronom, ont = verbe avoir." },
];
