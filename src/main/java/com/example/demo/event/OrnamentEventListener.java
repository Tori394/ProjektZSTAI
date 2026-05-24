package com.example.demo.event;

import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

@Service
public class OrnamentEventListener {

    @EventListener
    public void onOrnamentCreated(OrnamentCreatedEvent event) {
        System.out.println("EVENT: Nowa ozdoba utworzona");
        System.out.println("   Nazwa: " + event.getOrnament().getName());
        System.out.println("   ID: " + event.getOrnament().getId());
        System.out.println("   Cena: " + event.getOrnament().getPrice() + " PLN");
        System.out.println("   Rozmiar: " + event.getOrnament().getSize());
    }

    @EventListener
    public void onOrnamentDeleted(OrnamentDeletedEvent event) {
        System.out.println("EVENT: Ozdoba usunięta");
        System.out.println("   Nazwa: " + event.getOrnament().getName());
        System.out.println("   ID: " + event.getOrnament().getId());
        System.out.println("   Cena: " + event.getOrnament().getPrice() + " PLN");
        System.out.println("   Rozmiar: " + event.getOrnament().getSize());

    }
}

