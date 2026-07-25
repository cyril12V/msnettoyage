import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DevisForm } from "@/components/forms/DevisForm";

/** Remplit le formulaire avec un jeu de données valide. */
async function remplirFormulaire(utilisateur: ReturnType<typeof userEvent.setup>) {
  await utilisateur.type(screen.getByLabelText(/nom complet/i), "Marie Dupont");
  await utilisateur.type(screen.getByLabelText(/téléphone/i), "0620460703");
  await utilisateur.type(screen.getByLabelText(/^email/i), "marie@example.fr");
  await utilisateur.type(screen.getByLabelText(/ville de l'intervention/i), "Meaux");
  await utilisateur.selectOptions(
    screen.getByLabelText(/type de prestation/i),
    "entretien-regulier",
  );
  await utilisateur.type(
    screen.getByLabelText(/votre besoin/i),
    "Bureau de 80 m², entretien hebdomadaire souhaité.",
  );
  await utilisateur.click(screen.getByRole("checkbox"));
}

describe("DevisForm", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("affiche les erreurs de validation sans appeler l'API", async () => {
    const utilisateur = userEvent.setup();
    render(<DevisForm />);

    await utilisateur.click(screen.getByRole("button", { name: /envoyer ma demande/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent(/corrigés avant l'envoi/i);
    expect(fetch).not.toHaveBeenCalled();
  });

  it("signale un numéro de téléphone invalide sur le champ concerné", async () => {
    const utilisateur = userEvent.setup();
    render(<DevisForm />);

    await remplirFormulaire(utilisateur);
    await utilisateur.clear(screen.getByLabelText(/téléphone/i));
    await utilisateur.type(screen.getByLabelText(/téléphone/i), "12345");
    await utilisateur.click(screen.getByRole("button", { name: /envoyer ma demande/i }));

    expect(await screen.findByText(/numéro de téléphone français invalide/i)).toBeInTheDocument();
    expect(fetch).not.toHaveBeenCalled();
  });

  it("envoie la demande et affiche la confirmation", async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify({ message: "Demande envoyée." }), { status: 200 }),
    );

    const utilisateur = userEvent.setup();
    render(<DevisForm />);

    await remplirFormulaire(utilisateur);
    await utilisateur.click(screen.getByRole("button", { name: /envoyer ma demande/i }));

    expect(await screen.findByRole("status")).toHaveTextContent(/demande envoyée/i);

    const [url, options] = vi.mocked(fetch).mock.calls[0] ?? [];
    expect(url).toBe("/api/contact");
    expect(options?.method).toBe("POST");

    const charge = JSON.parse(String(options?.body)) as Record<string, unknown>;
    expect(charge.nom).toBe("Marie Dupont");
    expect(charge.consentement).toBe(true);
    expect(charge.societeWeb).toBe("");
  });

  it("affiche le message d'erreur renvoyé par l'API", async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify({ message: "Trop de demandes envoyées depuis cet appareil." }), {
        status: 429,
      }),
    );

    const utilisateur = userEvent.setup();
    render(<DevisForm />);

    await remplirFormulaire(utilisateur);
    await utilisateur.click(screen.getByRole("button", { name: /envoyer ma demande/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent(/trop de demandes/i);
  });

  it("reste utilisable si le réseau échoue", async () => {
    vi.mocked(fetch).mockRejectedValue(new Error("network down"));

    const utilisateur = userEvent.setup();
    render(<DevisForm />);

    await remplirFormulaire(utilisateur);
    await utilisateur.click(screen.getByRole("button", { name: /envoyer ma demande/i }));

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(/la connexion a échoué/i);
    });
    expect(screen.getByRole("button", { name: /envoyer ma demande/i })).toBeEnabled();
  });
});
