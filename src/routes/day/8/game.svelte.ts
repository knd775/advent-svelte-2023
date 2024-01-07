const cardImageUrlBase = 'https://advent.sveltesociety.dev/data/2023/day-eight/';

export class CardGame {
  cards: Card[] = [];
  constructor() {
    for (let i = 1; i <= 24; i++) {
      this.cards.push(new Card(i));
      this.cards.push(new Card(i));
    }
    this.shuffle();
  }

  shuffle() {
    let currentIndex = this.cards.length;
    let randomIndex: number;

    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [this.cards[currentIndex], this.cards[randomIndex]] = [
        this.cards[randomIndex] ?? new Card(0),
        this.cards[currentIndex] ?? new Card(0)
      ];
    }
  }

  reset() {
    this.cards.forEach((card) => {
      card.matched = false;
      card.flipped = false;
    });
    this.shuffle();
  }
}

class Card {
  value: number;
  matched = $state(false);
  flipped = $state(false);

  constructor(value: number) {
    this.value = value;
  }

  flip() {
    this.flipped = !this.flipped;
  }

  get imageUrl() {
    return `${cardImageUrlBase}${this.value}.png`;
  }
}
