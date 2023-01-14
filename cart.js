// define data in JSON array

// var has a universal scope
// let has a block scope
var products = [
    {
        name: "Monitor Light Bar",
        Quantity: 1,
        PPU: 899,
        Discount: 100
    },
    {
        name: "SteelSeries Arctis 5",
        Quantity: 2,
        PPU: 3199,
        Discount: 199
    },
    {
        name: "Keychron Q1 V2",
        Quantity: 1,
        PPU: 10000,
        Discount: 0
    }

]


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
        let cellDiscount = '<td class="text_right">' + discount + "</td>"


        let total = (products[p].PPU * products[p].Quantity) - products[p].Discount
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
    products.splice(0, products.length);
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
        Quantity: parseInt($('#inputQuantity').val()),
        PPU: parseInt($('#inputPPU').val()),
        Discount: parseInt($('#inputDiscount').val())
    }

    console.log(itemObject)

    // Check if the product already exists in the products array
    let existingProduct = products.find(p => p.name === itemObject.name && p.PPU === itemObject.PPU);
    if (existingProduct) {
        existingProduct.Quantity += parseInt(itemObject.Quantity);
        existingProduct.Discount += itemObject.Discount
    } else {
        products.push(itemObject)
    }
    loadData()
}

// TODO Should use product ID instead of name
function deleteProduct(index) {
    console.log("DELETE",index)
    delete products[index]  // delete the element from array
    $('#productBody').html("")
    loadData()
}
