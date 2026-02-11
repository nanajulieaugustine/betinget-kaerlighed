import Accepter from "@/components/globals/accept/Accepter";

const Proeveperiode = () => {
    return ( 
        <section className="px-4 sm:px-6 lg:px-12">
            <article className="mx-auto max-w-prose">
<h1>Prøveperiode</h1>

<p>
Dette er en tidsbegrænset prøveperiode. Formålet er at vurdere, om relationen kan fungere under de fastsatte betingelser. Perioden er ikke en garanti for fortsættelse.
</p>

<p className="font-bold">
Prøveperioden kan til enhver tid ophæves ensidigt af afsenderen uden yderligere forklaring eller forpligtelse.
</p>

<h4>Vilkår for prøveperioden:</h4>

<ul>
    <li className="li">
        Du accepterer de opstillede betingelser uden forbehold.
    </li>
    <li className="li">
        Manglende overholdelse af aftaler vil blive betragtet som brud på prøveperioden.
    </li>
    <li className="li">
        Gentagne eller væsentlige brud kan medføre øjeblikkelig ophør af relationen.
    </li>
    <li className="li">
        Usikkerhed eller utilfredshed med betingelserne fritager dig ikke for ansvar.
    </li>
</ul>

<h4>Ved manglende accept:</h4>

<ul>
    <li className="li">
        Hvis betingelserne ikke accepteres fuldt ud, anses prøveperioden for afvist.
    </li>
    <li className="li">
        Afvisning medfører, at relationen ikke fortsættes under disse vilkår.
    </li>
</ul>

<p>
Ved afslutning af prøveperioden foretages en vurdering. Fortsættelse er ikke automatisk og forudsætter, at betingelserne er overholdt tilfredsstillende.
</p>

<p>
Denne periode er en evaluering – ikke en forhandling.
</p>

<h4>Ophævelse af prøveperioden:</h4>

<ul>
    <li className="li">
        Ophævelse kan ske uden yderligere forklaring, begrundelse eller dialog.
    </li>
    <li className="li">
        Ved ophævelse kan al kommunikation ophøre øjeblikkeligt og permanent.
    </li>
    <li className="li">
        Der kan ikke forventes afklaring, afrunding eller emotionel bearbejdning efter ophør.
    </li>
    <li className="li">
        Modtager bærer selv ansvaret for håndtering af eventuelle følelsesmæssige reaktioner som følge af ophævelsen.
    </li>
</ul>

<p className="font-extrabold">Bemærk: konsekvensen af prøveperioden kan forudsætte ængstelige tanker, stress, og kan under nogle tilfælde medføre sammenligninger og problematikker i kommende relationer!</p>

<p>
Ophævelse anses som endelig og kan ikke genforhandles.
</p>


            </article>
            <Accepter
                showAcceptSome={false}
                showDecline={false}
                acceptAllLabel="Accepter prøveperiode"
                acceptPopupTitle="Accepter prøveperiode"
            />
        </section>
     );
}
 
export default Proeveperiode;