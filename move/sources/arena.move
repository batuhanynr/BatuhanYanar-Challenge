module challenge::arena;

use challenge::hero::Hero;
use sui::event;
use sui::sui;
use challenge::hero::hero_power;

// ========= STRUCTS =========

public struct Arena has key, store {
    id: UID,
    warrior: Hero,
    owner: address,
}

// ========= EVENTS =========

public struct ArenaCreated has copy, drop {
    arena_id: ID,
    timestamp: u64,
}

public struct ArenaCompleted has copy, drop {
    winner_hero_id: ID,
    loser_hero_id: ID,
    timestamp: u64,
}

// ========= FUNCTIONS =========

public fun create_arena(hero: Hero, ctx: &mut TxContext) {

    // TODO: Create an arena object
        let arena = Arena {
            id: object::new(ctx),
            warrior: hero,
            owner: ctx.sender(),
        };

    // TODO: Emit ArenaCreated event with arena ID and timestamp (Don't forget to use ctx.epoch_timestamp_ms(), object::id(&arena))
        event::emit(ArenaCreated {
            arena_id: object::id(&arena),
            timestamp: ctx.epoch_timestamp_ms(),
        });

    // TODO: Use transfer::share_object() to make it publicly tradeable
    transfer::share_object(arena);
}

#[allow(lint(self_transfer))]
public fun battle(hero: Hero, arena: Arena, ctx: &mut TxContext) {
    
    // TODO: Implement battle logic
        let Arena { id, warrior, owner } = arena;

    // TODO: Compare hero.hero_power() with warrior.hero_power()

        if (hero_power(&hero) > hero_power(&warrior)) {
            let winner_id = object::id(&hero);
            let loser_id = object::id(&warrior);

            transfer::public_transfer(warrior, ctx.sender());
            transfer::public_transfer(hero, ctx.sender());

    // TODO:  Emit BattlePlaceCompleted event with winner/loser IDs (Don't forget to use object::id(&warrior) or object::id(&hero) ). 
            event::emit(ArenaCompleted {
                winner_hero_id: winner_id,
                loser_hero_id: loser_id,
                timestamp: ctx.epoch_timestamp_ms(),
            });

        } 
        else {
            let winner_id = object::id(&warrior);
            let loser_id = object::id(&hero);

            transfer::public_transfer(hero, owner);
            transfer::public_transfer(warrior, owner);

            event::emit(ArenaCompleted {
                winner_hero_id: winner_id,
                loser_hero_id: loser_id,
                timestamp: ctx.epoch_timestamp_ms(),
            });
        };

    // TODO: Delete the battle place ID 
        object::delete(id);
}

