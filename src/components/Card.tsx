function Card({ balance }: { balance: number }) {
  return (
    <div className="h-44 w-80 rounded-xl bg-lime-400 p-4 shadow-xl shadow-lime-200">
      <h1 className="text-2xl font-medium">Saldo {balance} créditos</h1>
    </div>
  )
}

export default Card
