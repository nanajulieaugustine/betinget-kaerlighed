import FortrydForm from "@/components/fortrydelsesret/FortrydForm";

const Fortrydelsesret = () => {
    return ( 
        <main className="py-8">
        <section>
          <article className="flex flex-col gap-5 max-w-prose mx-auto">
            <div className="flex flex-col items-center justify-center">
              <h1>Fortrydelsesret</h1>
              <h4>Betinget Kærlighed</h4>
            </div>
            <p>Eftersom relationen ikke er garanteret ægteskab, kan du udøve din fortrydelsesret.  Indgåelse af aftale med afsender kan på ethvert tidspunkt, af hvilken som helst årsag ophøre pr. dags dato. Afsender garanterer ikke rationel tænkning ved pludseligt ophør i relationen, og enhver form for følelsesmæssig påvirkning sker på eget ansvar.</p>
            <p>I tilfælde af uhensigtsmæssig opførsel overfor afsender kan du vælge at udfylde nedenstående formular:</p>
            <FortrydForm
             intent="accept"
          fields={[
            { name: "navn", type: "text", required: true, placeholder: "Dit fulde navn" },
            { name: "email", type: "email", required: true, placeholder: "Din e-mail" },
            { name: "beskrivelse", type: "textarea", required: true, placeholder: "Beskriv hvorfor du ønsker at fortryde din kærlighed" },
          ]}
           
          buttonText="Indsend"
            />
            <h2>Ændringer eller rettelser</h2>
            <p>Hvis du ikke accepterer en ændring af vilkårene, skal du straks stoppe al adgang til afsender. Din fortsatte deltagelse i relationen efter enhver modifikation af vilkårene vil blive anset for din accept af vilkårene i modificeret form.
            </p>
          </article>
        </section>
      </main>
     );
}
 
export default Fortrydelsesret;