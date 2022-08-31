
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface CreateCardInput {
    amount?: Nullable<string>;
    color?: Nullable<string>;
    shape?: Nullable<string>;
}

export interface UpdateCardInput {
    id: number;
}

export interface CreateCardsetInput {
    exampleField?: Nullable<number>;
}

export interface UpdateCardsetInput {
    id: number;
}

export interface CreateCardspotInput {
    exampleField?: Nullable<number>;
}

export interface UpdateCardspotInput {
    id: number;
}

export interface CreateGameInput {
    name?: Nullable<string>;
    ownerId?: Nullable<string>;
}

export interface SetInput {
    id: string;
    spots: Nullable<number>[];
}

export interface UpdateGameInput {
    id: number;
}

export interface UserFilters {
    nameSearch?: Nullable<string>;
}

export interface Card {
    id?: Nullable<string>;
    amount?: Nullable<string>;
    color?: Nullable<string>;
    shape?: Nullable<string>;
    isVisible?: Nullable<boolean>;
    hasBeenTaken?: Nullable<boolean>;
}

export interface IQuery {
    cards(): Nullable<Card>[] | Promise<Nullable<Card>[]>;
    card(id: string): Nullable<Card> | Promise<Nullable<Card>>;
    cardsets(): Nullable<Cardset>[] | Promise<Nullable<Cardset>[]>;
    cardset(id: number): Nullable<Cardset> | Promise<Nullable<Cardset>>;
    draw(): Nullable<Nullable<Card>[]> | Promise<Nullable<Nullable<Card>[]>>;
    cardspots(): Nullable<Cardspot>[] | Promise<Nullable<Cardspot>[]>;
    cardspot(id: string): Nullable<Cardspot> | Promise<Nullable<Cardspot>>;
    games(): Nullable<Game>[] | Promise<Nullable<Game>[]>;
    game(id: string): Nullable<Game> | Promise<Nullable<Game>>;
    users(filters?: Nullable<UserFilters>): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
    user(id: string): Nullable<User> | Promise<Nullable<User>>;
    me(): Nullable<User> | Promise<Nullable<User>>;
    findOneOrCreate(externalId: string): Nullable<User> | Promise<Nullable<User>>;
}

export interface IMutation {
    createCard(createCardInput: CreateCardInput): Card | Promise<Card>;
    updateCard(updateCardInput: UpdateCardInput): Card | Promise<Card>;
    removeCard(id: number): Nullable<Card> | Promise<Nullable<Card>>;
    createCardset(): Cardset | Promise<Cardset>;
    updateCardset(updateCardsetInput: UpdateCardsetInput): Cardset | Promise<Cardset>;
    removeCardset(id: number): Nullable<Cardset> | Promise<Nullable<Cardset>>;
    createCardspot(createCardspotInput: CreateCardspotInput): Cardspot | Promise<Cardspot>;
    updateCardspot(updateCardspotInput: UpdateCardspotInput): Cardspot | Promise<Cardspot>;
    removeCardspot(id: number): Nullable<Cardspot> | Promise<Nullable<Cardspot>>;
    createGame(createGameInput: CreateGameInput): Game | Promise<Game>;
    updateGame(updateGameInput: UpdateGameInput): Game | Promise<Game>;
    removeGame(id: string): Nullable<Game> | Promise<Nullable<Game>>;
    checkSet(setInput: SetInput, playerId?: Nullable<string>): Game | Promise<Game>;
    stopGame(): number | Promise<number>;
    pauseGame(gameId: string, playerId: string): Game | Promise<Game>;
}

export interface Cardset {
    id?: Nullable<string>;
    cards?: Nullable<Nullable<Card>[]>;
}

export interface Cardspot {
    id?: Nullable<string>;
    card_number?: Nullable<number>;
    card?: Nullable<Card>;
}

export interface Game {
    id?: Nullable<string>;
    name?: Nullable<string>;
    gamespots?: Nullable<Nullable<Cardspot>[]>;
}

export interface ISubscription {
    watchGame(): string | Promise<string>;
}

export interface User {
    id?: Nullable<string>;
    username?: Nullable<string>;
}

type Nullable<T> = T | null;
