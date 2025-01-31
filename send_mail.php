<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Vérification des champs requis
    if (empty($_POST['name']) || empty($_POST['email']) || empty($_POST['contact_type']) || empty($_POST['message'])) {
        echo json_encode(["status" => "error", "message" => "Tous les champs sont requis."]);
        exit;
    }

    // Récupérer et nettoyer les données du formulaire
    $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $contact_type = filter_var($_POST['contact_type'], FILTER_SANITIZE_STRING);
    $message = filter_var($_POST['message'], FILTER_SANITIZE_STRING);

    // Validation de l'email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["status" => "error", "message" => "Adresse email invalide."]);
        exit;
    }

    // Destinataire de l'email
    $to = "badiane.falou95@gmail.com";

    // Sujet de l'email
    $subject = "[$contact_type] Nouveau message de " . $name;

    // Corps de l'email
    $body = "Nom: $name\n";
    $body .= "Email: $email\n";
    $body .= "Type de contact: " . ucfirst($contact_type) . "\n";
    $body .= "Message:\n$message";

    // En-têtes de l'email
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // Tentative d'envoi de l'email
    if (mail($to, $subject, $body, $headers)) {
        echo json_encode(["status" => "success", "message" => "Votre message a été envoyé avec succès !"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Erreur lors de l'envoi de votre message."]);
    }
} else {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Méthode non autorisée."]);
}
