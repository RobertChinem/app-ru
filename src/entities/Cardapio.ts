interface Cardapio {
  dia: string
  almoco: {
    principal: string
    vegetariano: string
    guarnicao: string
  }
  jantar: {
    principal: string
    vegetariano: string
    guarnicao: string
  }
  saladas: string[]
  sobremesas: string[]
}

export default Cardapio
