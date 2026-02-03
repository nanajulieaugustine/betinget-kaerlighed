import TidligerePil from "@/components/globals/TidligerePil";
import Accepter from "@/components/globals/accept/Accepter";
import Authentication from "@/components/globals/accept/Authentication";

export default function Home() {
  return (
    <>
      <main className="py-8">
        <section>
          <article className="flex flex-col gap-5 max-w-prose mx-auto">
            <div className="flex flex-col items-center justify-center">
              <h1>Terms & Conditions</h1>
              <h4>Betinget Kærlighed</h4>
            </div>
            <p className="max-w-prose capitalize">DISSE TJENESTEVILKÅR ("TJENESTEVILKÅR" ELLER "AFTALE") UDGØR EN (IKKE)JURIDISK AFTALE OG INDGÅS MELLEM AFSENDER OG DEN PERSON, DER ACCEPTERER DISSE TJENESTEVILKÅR.</p>
            <p>Du bekræfter over for afsenderen og samtykker til, at du som repræsentant accepterer disse tjenestevilkår, er myndig, og har ret og autoritet til at godkende disse brugerbetingelser på dine vegne.</p>
            <p>Du tilkendegiver, at du accepterer og vil overholde disse tjenestevilkår, som anført;
            ændringer, tilføjelser eller sletninger på brugernes vegne accepteres ikke. </p>
            <h2>Vilkår</h2>
            <p>Du bekræfter overfor afsender, og accepterer vilkårene for betinget kærlighed.
            Betinget kærlighed er, når kærlighed gives med forbehold. Det er kærlighed afhængig af tilpasning og modydelser.
            Ved samtykke af vilkår og betingelser, modsiger Du dig retten til ubetinget kærlighed, uden skjulte krav
            </p>
            <h3>Begrænsninger</h3>
            <span className="font-medium">Retningslinjer for nævnte indhold må ikke:</span>
            <ul>
              <li className="li">Inkludere personlige, private eller fortrolige oplysninger, der tilhører andre</li>
              <li className="li">Deltage i eller fremme enhver ulovlig, svigagtig eller manipulerende aktivitet</li>
              <li className="li">Inkludere alt indhold, der er uærligt, vildledende eller irrelevant for afsender</li>
              <li className="li" >Inkludere noget ærekrænkende, injurierende, krænkende, stødende, nedsættende, skadeligt, ulovligt, svigagtigt, chikanerende, truende, hadsk, voldeligt, eller indhold, der på anden måde kan være stødende.</li>
            </ul>
           <h3>Ansvarsfraskrivelse</h3>
            <span className="font-medium">Undgå relationelle misforståelser</span>
               <ul>
              <li className="ol">Afsender garanterer ikke at relationen vil være uafbrudt eller fejlfri, og du accepterer at afsender fra tid til anden kan tilbagetrække kontakt i en ubestemt tidsperiode eller ophøre forholdet helt eller delvist på ethvert tidspunkt, hvor det er nødvendigt for at beskytte afsenders interesser.</li>
              <li className="ol">Du accepterer udtrykkeligt, at din deltagelse eller manglende deltagelse i relationen sker på egen risiko. Afsender leveres “som de er” og “som de er tilgængelige” uden garantier for tilfredsstillende kvalitet og egnethed til et bestemt formål. Afsender garanterer ikke at opfylde krav eller være fri for fejl, og fraskriver sig ethvert ansvar i forbindelse hermed.</li>
              <li className="ol">Relationen kan kun opretholdes med succes ved fuld transparens mellem begge parter. Afsender garanterer dog ikke succes og tilpasninger kan forekomme.</li >
            </ul>
          </article>
        </section>
      </main>

      <Accepter />
   </>
  );
}
