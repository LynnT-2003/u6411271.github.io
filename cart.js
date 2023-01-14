// define data in JSON array

// var has a universal scope
// let has a block scope
var products = [
    {
        name: "Gaming PC",
        Quantity: 1,
        PPU: 60000,
        Total: 60000,
        Discount: 0
    },
    {
        name: "AOC 27inch Monitor",
        Quantity: 2,
        PPU: 9000,
        Total: 18000,
        Discount: 0
    },
    {
        name: "Steelseries Arctis",
        Quantity: 1,
        PPU: 3000,
        Total: 3000,
        Discount: 0
    },
    {
        name: "Keychron Q1 V2",
        Quantity: 1,
        PPU: 10000,
        Total: 10000,
        Discount: 0
    }

]

function addToCart() {
    let elProdct = document.getElementById("products")
    let pVal = elProdct.value
    console.log(pVal)
    let productObj = {
        name: $('#products').val(),
        Quantity: $('#qty').val(),
        PPU: $('#ppu').val(),
        Discount: $('#discount').val()
    }
    

    // Clear existing items in the table
    // let productList = document.getElementById("productList")
    // for (let x = 0; x < products.length; x++) {
    //     productList.deleteRow(1)
    // }

    $('#productBody').html("")

    products.push(productObj)
    loadData()
}

function loadData() {
    
    let allRows = ""
    let gross = 0
    let totalDiscount = 0
    for (let p in products) {
        let cellDelete = `<td><img class='icon' src='icon-delete.png' onclick='deleteProduct("${p}")'>` + "</td>"
        let cellName = '<td class="text_left">' + products[p].name + "</td>"
        let cellQuantity = '<td class="text_right">' + products[p].Quantity + "</td>"
        let cellPPU = '<td class="text_right">' + products[p].PPU + "</td>"

        let discount = parseInt(products[p].Discount)
        totalDiscount += discount
        let cellDiscount = '<td class="text_right">' + totalDiscount + "</td>"


        let total = (products[p].PPU - products[p].Discount) * products[p].Quantity
        gross += total
        let cellTotal = '<td class="text_right">' + total + "</td>"
        let row = `<tr>${cellDelete}${cellQuantity}${cellName}${cellPPU}${cellDiscount}${cellTotal}</tr>`
        allRows += row
    }
    $('#productBody').html(allRows)

    $("#grossID").html(gross)

    let vat = gross * 0.07
    let net = gross + vat
    $("#vatID").html(vat.toFixed(2))
    $("#netID").html(net.toFixed(2))
    $("#discountID").html(totalDiscount)

}

function clearData() {
    let table = document.getElementById("productBody");
    while (table.rows.length > 0) {
        table.deleteRow(0);
    }
    $("#grossID").html(0)
    $("#vatID").html(0)
    $("#netID").html(0)
}

function addItem() {
    let elItem = document.getElementById("inputItem")
    let elPPU = document.getElementById("inputPPU")
    let elDiscount = document.getElementById("inputDiscount")
    let elQuantity = document.getElementById("inputQuantity")
    
    let itemObject = {
        name: elItem.value,
        Quantity: $('#inputQuantity').val(),
        PPU: $('#inputPPU').val(),
        Discount: $('#inputDiscount').val()
    }

    console.log(itemObject)

    products.push(itemObject)
    loadData()
}

// TODO Should use product ID instead of name
function deleteProduct(index) {
    console.log("DELETE",index)
    delete products[index]  // delete the element from array
    $('#productBody').html("")
    loadData()
}
