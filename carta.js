// Contenido de la carta, copiado tal cual del documento "Sobre ti".
// Cada lista interna es una sección: cada sección empieza en una página nueva
// y ocupa las páginas que necesite.
const CARTA = [
  [
    {
      "tipo": "titulo",
      "texto": "Feliz cumpleee Anii"
    },
    {
      "tipo": "p",
      "texto": "Temas:"
    },
    {
      "tipo": "lista",
      "items": [
        "Agradecimiento",
        "¿Cómo te conocí?",
        "¿Por qué sigo a tu lado?",
        "Perdón",
        "Conclusión"
      ]
    }
  ],
  [
    {
      "tipo": "subtitulo",
      "texto": "Agradecimientos:"
    },
    {
      "tipo": "p",
      "texto": "Gracias por estar en mi vida…La verdad cuándo volví de la Leopoldo volví despedazado creo que hasta quería suicidarme la pase de la mierda, ahí sentía mucho arrepentimiento porque prácticamente deje toda una vida por mis decisiones imprudentes e impulsivas, después volví al Jacinto pero me sentía como alguien fuera de lugar y no estaba acostumbrado aún al nuevo curso y aparte me hice enemigo del único idiota que sabia boxear llamado Herrera XD, también estaba investigando a Jeremy porque al parecer estaba metido en un rollo grande entre el, Ariana, Fergie y yo."
    },
    {
      "tipo": "p",
      "texto": "Pase de ser alguien muy sociable, con mucho carisma creo que hasta simpático a un inadaptado sin ganas de nada."
    },
    {
      "tipo": "p",
      "texto": "El peor maldito año de mi vida o eso creía, porque después llegaste tu y ya no se sentía tan mal con otras personas talvez era más confiado pero contigo tenía la paz que había perdido, nose porque decidiste ser amigo de este fracasado habiendo tantos en el curso pero gracias enserio estaba muy solo, todos los que decía amigos me dieron la espalda y hasta dejo de importarme ir a clases, incluso me asaltaron pero estaba tan desilusionado de la vida que los ignore xd, pero después empecé a conocerte y ver que alguien al fin me elegia a mi y pues se sentía lindo creo…"
    }
  ],
  [
    {
      "tipo": "subtitulo",
      "texto": "¿Cómo te conocí?"
    },
    {
      "tipo": "p",
      "texto": "La verdad no me acuerdo, creo que un día te mandaron a un asiento atrás mío y empezamos a hablar de las migajas que nos daban, al inicio pensé que eras igual de pendeja que las del resto del curso y una regalada xd, pero no fue así, eras más pendeja que las del curso pero aunque parecieras superficial la verdad terminaste siendo mejor persona que yo, porque te fui conociendo poco a poco y me di cuenta que también tienes cosas que te duelen."
    },
    {
      "tipo": "p",
      "texto": "Al inicio no quería encariñarme mucho contigo, me daba miedo la idea de volver a confiar en alguien, porque sabía que si me encariñaba iba a terminar dependiendo de ti de alguna forma y la verdad que si así termino, nose porque pero contigo siempre me volvía medio idiota xd, supongo que de alguna forma me hacías sentir seguro y bajar mis defensas me hacia más idiota, pero me dabas mucha comodidad la verdad, siempre que me sentía muy mal te podía dar un abrazo o usar de almohada, una almohada muy cómoda y gordita , porque imagínate abrazar a Naula eso suena muy gei imagínateee q asco."
    }
  ],
  [
    {
      "tipo": "subtitulo",
      "texto": "¿Porque sigo a tu lado?"
    },
    {
      "tipo": "p",
      "texto": "No lo se la verdad jajaj, bueno creo que terminaste siendo mi hombro en el que descansar después de un día de mierda, los días no eran tan mierdas cuando estabas conmigo, no importaba cuantos grupos tuviera que dirigir, cuantas malas notas tuviera, cuantas veces me peleaba con Ariana o Damaris, no tenía que dar explicaciones porque si tu estabas ahí todo estaba bien."
    },
    {
      "tipo": "p",
      "texto": "De hecho, mi miedo se hizo realidad… me encariñe demasiado contigo creo y bueno me acostumbre a que siempre estes ahí, así que cuando murió mi tío Leo y me dio su último abrazo con sus últimas fuerzas y me hizo hacer promesas que ahora considero maldiciones… cuando me enteré de que probablemente tenga que matar a mi otro tío porque es un hp por lo que le hizo a mi familia, que mi papá no es lo que creía y solo es otro bastardo. Se sintió mal me dolió más que mil desamores Ariana y Damaris no son nada comparado a lo que sentí y siento respecto a esos temas y me los tengo que tragar, no te puedo contar nada y tanto dolor junto, creo mucho odio en mi, un odio silencioso…Por esa razón no ingrese a ninguna universidad este año, me sentí tan mal que deje de ir al pre y mejor pedí un tiempo de descanso para procesar todo."
    }
  ],
  [
    {
      "tipo": "subtitulo",
      "texto": "Perdón"
    },
    {
      "tipo": "p",
      "texto": "Perdón por no contarte nada de mi, creo que abrazar así de la nada sin decir que me sucede también es guardar dolor, pero principalmente perdón por no contarte lo que me gusta, lo que hago cuando no estoy en el cole, por no contarte mis pasatiempos, creo que si eres alguien tan especial para mi y debía de hacerlo."
    },
    {
      "tipo": "p",
      "texto": "Lo haré ahora espero que no sea muy tarde jajajaj, bueno la verdad ya llevo más de un año entrenando xdd, se que no se nota pero probablemente soy más fuerte que el promedio del colegio por eso soy tan pesado xd, incluso le he ganado a tipos que pesan el doble jajajaj mi genética es muy mala no importa que tan fuerte sea no se va a notar pero el otro día ya levante 190 kilos en la prensa y espero llegar a los 200 pronto, también aprendí a boxear un poco no se la gran cosa solo se pegar golpes rectos 1 2 1 2  van con fuerza, estoy aprendiendo un combo pero todavía me faltan cosas como el ritmo o esquivar golpes por que por el momento bloqueo con la cara xd, también estaba aprendiendo a usar la pistola de mi papá, nose si te lo conte pero el era policía y de los jodidos, no pienso matar a nadie(aún) pero creo que puede servir en alguna ocasión como para bloquear el gatillo."
    },
    {
      "tipo": "p",
      "texto": "Me gusta mucho la tecnología, el anime y esas cosas nerds, recién estoy terminando un curso de full stack(es como desarrollo web pero con bases de datos y otras cosas) estoy armando un curriculum porque tengo como 13 certificados que nose de dónde saque y bueno estoy viendo si trabajo para alguna empresa argentina porque acá son una mierda, quiero ganar dinero, comprarme una moto con mi propio esfuerzo sin pedir un centavo e independizarme lo más rápido posible porque a veces no aguanto estar en mi casa jajaj."
    },
    {
      "tipo": "p",
      "texto": "Perdón por no decirte dónde vivo la verdad ni yo mismo me siento cómodo en mi casa y no quisiera que alguien venga y sienta lo mismo, no vivo en los conjuntos en realidad somos dueños de los conjuntos."
    },
    {
      "tipo": "p",
      "texto": "Es broma no somos dueños de los conjuntos xd, pero si mis papás son los que arriendan  a personas departamentos grandes y lujosos alado dicen que cuando seamos grandes cada departamento será para cada hijo pero la verdad yo no quisiera volver aquí. Si te preguntas porque Ariana sabe es porque a ella la llevaban de pequeña a mi casa y bueno ese día que vino a mi casa era porque estaba cojo y no encontraba el uber así que bueno perdón también por eso de la ubicación, pero enserio ella es la única que sabe dónde vivo."
    },
    {
      "tipo": "p",
      "texto": "Perdón por lo del intento del beso jejeje, hmm nose que paso la verdad, no te voy a mentir antes me gustabas pero entre el Isma blablablá el Gabo blablábla y te veías muy feliz creo y decidí dejarlo así en fin ese día creo que me acorde de eso y ese día andaba alucinando con eso xd, si te preguntas porque te tome de la mano en el coche, la verdad no sabía como llamar tu atención xddd y bueno todavía no pensaba con claridad, solo recupere la movilidad del cuerpo así que a don pendejo no se le ocurrió quitar la mano y creo que lo hice más incomodo perdón por eso enserio al siguiente día no sabía que pensar y perdón si te deje confundida."
    },
    {
      "tipo": "p",
      "texto": "Perdón por irme de la fiesta, además sabía que iban a ir Yohan, el gordo y otros webones que no me caen bien bueno no me caen mal pero me incomodan un poco xddd, solo fui por ti y traté de aguantar pero luego me abofeteaste de la nada y me ignoraste así que me sentí mal y mejor me fui."
    },
    {
      "tipo": "p",
      "texto": "Perdón porque la sección de perdón es más grande xddddd."
    }
  ],
  [
    {
      "tipo": "subtitulo",
      "texto": "Conclusión:"
    },
    {
      "tipo": "p",
      "texto": "Nose que pienses de mi ahora… tal vez te conté demasiado no lo sé, espero no arruinar tu cumpleaños con todo esto, no he cambiado, pero nose como me veas ahora que sabes lo mucho que te aprecio aunque no te lo diga, lo que escondía detrás de esas veces que tenía “sueño”, lo que hago o pienso hacer, y mi estúpida forma de pensar porque nose porque cuando alguien sabe demasiado sobre mí me dan esas ganas de desaparecer de la vida de esa persona de la nada por al menos 2 años o para siempre así que si vez este chat bloqueado luego no te asombres, nose talvez tenía miedo precisamente de contarte todo, me gustaba la inofensiva versión que tenías de mi por eso nunca me moleste en darte detalles de mi vida o aclarar algo no quería ser igual al resto de tus amigos pero bueno, cuídate Ani, te deseo lo mejor, feliz cumpleeee."
    },
    {
      "tipo": "p",
      "texto": "Posdata: no me alcanzó para flores…"
    },
    {
      "tipo": "enlace",
      "texto": "https://andy202ochoa.github.io/Lirio/"
    }
  ]
];
