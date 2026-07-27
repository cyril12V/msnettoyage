"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { CheckboxField, SelectField, TextField, TextareaField } from "@/components/ui/Field";
import { Icon } from "@/components/ui/Icon";
import { services } from "@/data/services";
import { site, telHref } from "@/lib/site";
import { cn } from "@/lib/utils";
import { contactSchema } from "@/schemas/contact";

type Statut = "repos" | "envoi" | "succes" | "erreur";

type DevisFormProps = {
  /** Pré-sélectionne une prestation, par exemple depuis une page service. */
  prestationParDefaut?: string;
  className?: string;
  /** Identifiant d'ancre, pour les liens « Demander un devis ». */
  id?: string;
};

const optionsPrestation = [
  ...services.map((service) => ({ value: service.slug, label: service.shortName })),
  { value: "autre", label: "Autre demande" },
];

/** Extrait les erreurs par champ d'une réponse d'API. */
function lireErreursApi(charge: unknown): { message: string; champs: Record<string, string> } {
  const defaut = {
    message: "Votre demande n'a pas pu être transmise. Réessayez ou appelez-nous.",
    champs: {},
  };

  if (typeof charge !== "object" || charge === null) return defaut;

  const objet = charge as { message?: unknown; champs?: unknown };
  const message = typeof objet.message === "string" ? objet.message : defaut.message;
  const champs =
    typeof objet.champs === "object" && objet.champs !== null
      ? (objet.champs as Record<string, string>)
      : {};

  return { message, champs };
}

export function DevisForm({ prestationParDefaut, className, id }: DevisFormProps) {
  const [statut, setStatut] = useState<Statut>("repos");
  const [messageGlobal, setMessageGlobal] = useState("");
  const [erreurs, setErreurs] = useState<Record<string, string>>({});
  const alerteRef = useRef<HTMLDivElement>(null);

  /**
   * Instant d'affichage du formulaire, qui sert à calculer la durée de saisie
   * transmise au serveur pour écarter les soumissions instantanées.
   *
   * Posé après le montage : la valeur ne doit pas différer entre le rendu
   * serveur et le rendu client. C'est la DURÉE qui part sur le réseau, jamais
   * cet instant : le serveur n'a ainsi aucune horloge étrangère à comparer à
   * la sienne, et la latence ne fausse plus la mesure.
   */
  const affichageAtRef = useRef<number | undefined>(undefined);
  useEffect(() => {
    affichageAtRef.current = Date.now();
  }, []);

  // Le message d'erreur global doit être annoncé et atteignable au clavier.
  useEffect(() => {
    if (statut === "erreur") {
      alerteRef.current?.focus();
    }
  }, [statut]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formulaire = event.currentTarget;
    const donnees = new FormData(formulaire);

    const charge = {
      nom: String(donnees.get("nom") ?? ""),
      telephone: String(donnees.get("telephone") ?? ""),
      email: String(donnees.get("email") ?? ""),
      ville: String(donnees.get("ville") ?? ""),
      prestation: String(donnees.get("prestation") ?? ""),
      message: String(donnees.get("message") ?? ""),
      consentement: donnees.get("consentement") === "on",
      societeWeb: String(donnees.get("societeWeb") ?? ""),
      dureeSaisieMs:
        affichageAtRef.current === undefined ? undefined : Date.now() - affichageAtRef.current,
    };

    // Première passe côté client : évite un aller-retour réseau inutile.
    const validation = contactSchema.safeParse(charge);

    if (!validation.success) {
      const champs: Record<string, string> = {};
      for (const issue of validation.error.issues) {
        const champ = issue.path[0];
        if (typeof champ === "string" && !(champ in champs)) {
          champs[champ] = issue.message;
        }
      }

      setErreurs(champs);
      setMessageGlobal("Certains champs doivent être corrigés avant l'envoi.");
      setStatut("erreur");
      return;
    }

    setStatut("envoi");
    setErreurs({});
    setMessageGlobal("");

    try {
      const reponse = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(charge),
      });

      if (!reponse.ok) {
        const { message, champs } = lireErreursApi(await reponse.json().catch(() => null));
        setErreurs(champs);
        setMessageGlobal(message);
        setStatut("erreur");
        return;
      }

      formulaire.reset();
      setStatut("succes");
    } catch {
      setMessageGlobal(
        "La connexion a échoué. Vérifiez votre réseau, ou appelez-nous au " +
          `${site.contact.phoneDisplay}.`,
      );
      setStatut("erreur");
    }
  }

  if (statut === "succes") {
    return (
      <div
        className={cn(
          "rounded-2xl bg-white p-8 text-center shadow-[var(--shadow-float)]",
          className,
        )}
        role="status"
      >
        <span className="bg-brand-soft text-brand mx-auto inline-flex size-14 items-center justify-center rounded-full">
          <Icon name="checkCircle" className="size-8" />
        </span>
        <h2 className="text-ink mt-5 text-xl font-bold tracking-tight uppercase">
          Demande envoyée
        </h2>
        <p className="text-muted mx-auto mt-3 max-w-md text-sm leading-relaxed">
          Nous avons bien reçu votre demande et revenons vers vous sous {site.delaiReponse} avec un
          devis gratuit. Pour une urgence, appelez-nous directement.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href={telHref} icon="phone" iconPosition="left">
            {site.contact.phoneDisplay}
          </Button>
          <Button variant="secondary" onClick={() => setStatut("repos")}>
            Nouvelle demande
          </Button>
        </div>
      </div>
    );
  }

  const enCours = statut === "envoi";

  return (
    <form
      id={id}
      onSubmit={handleSubmit}
      noValidate
      className={cn("flex flex-col gap-5 rounded-2xl bg-white p-6 sm:p-8", className)}
    >
      <div>
        <h2 className="text-ink text-lg font-bold tracking-tight uppercase">Demander un devis</h2>
        <p className="text-muted mt-1.5 text-sm">
          Gratuit et sans engagement, réponse sous {site.delaiReponse}.
        </p>
      </div>

      {statut === "erreur" && messageGlobal ? (
        <div
          ref={alerteRef}
          tabIndex={-1}
          role="alert"
          className="border-danger/30 bg-danger/5 text-danger rounded-lg border px-4 py-3 text-sm"
        >
          {messageGlobal}
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          name="nom"
          label="Nom complet"
          autoComplete="name"
          placeholder="Marie Dupont"
          required
          error={erreurs.nom}
        />
        <TextField
          name="telephone"
          type="tel"
          label="Téléphone"
          autoComplete="tel"
          placeholder="06 12 34 56 78"
          required
          error={erreurs.telephone}
        />
        <TextField
          name="email"
          type="email"
          label="Email"
          autoComplete="email"
          placeholder="marie.dupont@email.fr"
          required
          error={erreurs.email}
        />
        <TextField
          name="ville"
          label="Ville de l'intervention"
          autoComplete="address-level2"
          placeholder="Meaux"
          required
          error={erreurs.ville}
        />
      </div>

      <SelectField
        name="prestation"
        label="Type de prestation"
        placeholder="Sélectionnez une prestation"
        options={optionsPrestation}
        defaultValue={prestationParDefaut}
        required
        error={erreurs.prestation}
      />

      <TextareaField
        name="message"
        label="Votre besoin"
        placeholder="Surface, nombre de pièces, fréquence souhaitée, délai…"
        hint="Plus votre description est précise, plus le devis sera juste."
        required
        error={erreurs.message}
      />

      {/*
        Leurre anti-robot : masqué visuellement et retiré de l'ordre de
        tabulation comme de l'arbre d'accessibilité. Un humain ne le voit ni ne
        l'atteint ; un robot qui remplit tous les champs se signale.
      */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="societeWeb">Ne pas remplir ce champ</label>
        <input id="societeWeb" name="societeWeb" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <CheckboxField
        name="consentement"
        label={
          <>
            J&apos;accepte que mes coordonnées soient utilisées par {site.name} pour répondre à ma
            demande de devis. Elles ne sont ni revendues ni utilisées à des fins publicitaires.
          </>
        }
        required
        error={erreurs.consentement}
      />

      <Button
        type="submit"
        size="lg"
        fullWidth
        disabled={enCours}
        icon={enCours ? undefined : "arrowRight"}
      >
        {enCours ? "Envoi en cours…" : "Envoyer ma demande"}
      </Button>

      <p className="text-muted text-center text-xs">
        Vous préférez le téléphone ?{" "}
        <a href={telHref} className="text-brand font-semibold underline underline-offset-2">
          {site.contact.phoneDisplay}
        </a>
      </p>
    </form>
  );
}
