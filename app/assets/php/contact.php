<?php

    // Mail settings
    $to      = "developer@ramonserranoprofile.tech";


    // You can put here your email
    $header = "From: noreply@ramonserranoprofile.tech\r\n";
    $header.= "MIME-Version: 1.0\r\n";
    $header.= "Content-Type: text/plain; charset=utf-8\r\n";
    $header.= "X-Priority: 1\r\n";

    if (isset($_POST["name"]) && isset($_POST["email"]) && isset($_POST["subject"]) && isset($_POST["message"])) {

        $content  = "Name: "        . $_POST["name"]    . "\r\n";
        $content .= "Email: "       . $_POST["email"]   . "\r\n";
        $content .= "Subject: "     . $_POST["subject"]   . "\r\n";
        $content .= "Message: "     . "\r\n" . $_POST["message"];
        $subject = $_POST["subject"];

        if (mail($to, $subject, $content, $header)) {
            $result = array(
                "message"    => "Thanks for contacting us.",
                "sendstatus" => 1
            );

            echo json_encode($result);
        } else {
            $result = array(
                "message"    => "Sorry, something is wrong.",
                "sendstatus" => 0
            );

            echo json_encode($result);
        }

    }

?>