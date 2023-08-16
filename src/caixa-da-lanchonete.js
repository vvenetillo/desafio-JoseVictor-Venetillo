class CaixaDaLanchonete {
  constructor() {
    this.cardapio = {
      cafe: 3.0,
      chantily: 1.5,
      suco: 6.2,
      sanduiche: 6.5,
      queijo: 2.0,
      salgado: 7.25,
      combo1: 9.5,
      combo2: 7.5,
    };
    this.formasDePagamento = ["dinheiro", "credito", "debito"];
  }

  formatarValor(valor) {
    return `R$ ${valor.toFixed(2).replace(".", ",")}`;
  }

calcularValorDaCompra(formaDePagamento, itens) {
    if (!this.formasDePagamento.includes(formaDePagamento)) {
      return "Forma de pagamento inválida!";
    }

    const carrinho = [];

    for (const itemInfo of itens) {
      const [itemCode, quantity] = itemInfo.split(",");
      if (!this.cardapio[itemCode]) {
        return "Item inválido!";
      }

      if (!carrinho[itemCode]) {
        carrinho[itemCode] = 0;
      }
      carrinho[itemCode] += parseInt(quantity);
    }

    let total = 0;

    for (const itemCode in carrinho) {
      const quantity = carrinho[itemCode];
      const itemPrice = this.cardapio[itemCode];

      if (quantity <= 0) {
        return "Quantidade inválida!";
      }
      if (itemCode === "chantily" && formaDePagamento === "dinheiro") {
        const mainItem = "sanduiche"; // Defina o item principal correspondente ao chantily
        if (!carrinho[mainItem]) {
          return "Item extra não pode ser pedido sem o principal";
        }}
      
        if (itemCode === "queijo" && formaDePagamento === "credito") {
          const mainItem = "sanduiche"; // Defina o item principal correspondente ao queijo
          if (!carrinho[mainItem]) {
            return "Item extra não pode ser pedido sem o principal";
          }
        }
      
        if (itemCode === "queijo" && formaDePagamento === "debito") {
          const mainItem = "sanduiche"; // Defina o item principal correspondente ao queijo com outro item
          if (!carrinho[mainItem]) {
            return "Item extra não pode ser pedido sem o principal";
          }
        }
        else if (itemCode === "chantily" && formaDePagamento === "credito") {
          const mainItem = "extra"; // Defina o item principal correspondente ao chantily com outro item
           if (!carrinho[mainItem]) {
            return "Item extra não pode ser pedido sem o principal";
          }
        } else if (itemCode.endsWith(" com outro item")) {
          const mainItem = itemCode.replace(" com outro item", "");
          if (!carrinho[mainItem]) {
            return "Item extra não pode ser pedido sem o principal";
          }
        }  if (itemCode !== "combo1" && itemCode !== "combo2") {
          total += itemPrice * quantity;
        }
        
      
    }

    if (total === 0) {
      return "Não há itens no carrinho de compra!";
    }

    if (formaDePagamento === "dinheiro") {
      total *= 0.95; // 5% de desconto
    } else if (formaDePagamento === "credito") {
      total *= 1.03; // 3% de acréscimo
    }

    return this.formatarValor(total);
  }
}

export default CaixaDaLanchonete;
