function computerPlay() {
  const CHOICES = ["Rock", "Paper", "Scissors"];

  return CHOICES[Math.round(Math.random() * 2)];
}
