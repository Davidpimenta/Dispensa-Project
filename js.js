//Menu-Responsivo

var menu = document.querySelector('.menu-cell')
var menudesktop = document.querySelectorAll('.nav-menu')
var menumobile = document.getElementById('menu-mobile')
menu.addEventListener('click', () => {

    if(menumobile.style.height == '0px' || menumobile.style.height == ''){

        setTimeout(() => {
            menumobile.style.display = 'flex'
            menudesktop[0].style.display = 'inline-block'
            menumobile.style.animation = 'menuanimation 0.2s linear 1'
            menumobile.style.padding = `${10}px ${10}%`
        }, 160)

        setTimeout(() => {
            menudesktop[1].style.display = 'inline-block'
            menumobile.style.height = 53 + 'px'
        }, 350)
       
    } else {
        menumobile.style.animation = 'menuanimationclose 0.2s linear 1'
        menudesktop[1].style.display = 'none'
        setTimeout(() => {
            menudesktop[0].style.display = 'none'
            menumobile.style.height = 0 + 'px'
            menumobile.style.padding = `${0}px ${10}%`
        }, 100)
        
    }
})



//Menu-responsivo

//Sistema

//Input

var dia = document.getElementById('dia')

var descricao = document.getElementById('descricao')

var valor = document.getElementById('valor')


//Select

var ano = document.getElementById('ano')

var mes = document.getElementById('mes')

var tipo = document.getElementById('tipo')

var adcbutton = document.getElementById('adicionar')


//aviso
var sombreado = document.getElementById('sombreado')
var divalert = document.getElementById('alert')

var closealert = document.querySelectorAll('.close')

if(adcbutton !== null){
    adcbutton.addEventListener('click' , () => {
        if(ano.value == '' || mes.value == '' | tipo.value == '' || descricao.value == '' || dia.value == '' || valor.value == ''){
            var h1 = document.getElementById('h1')
            h1.style.color = 'hsl(354, 70%, 46%)'
            var p = document.getElementById('p')
            var voltar = document.getElementById('voltar')
            voltar.innerText = 'Voltar e corrigir'
            h1.innerText = 'Erro na inclusão do registro'
            p.innerText = 'Erro na gravação, verifique se todos os campos foram preenchidos corretamente!'
            setTimeout(() => {
                divalert.style.display = 'flex'
                divalert.style.animation = 'alertopen 0.2s linear 1'
            }, 150)
            sombreado.style.display = 'block'
        } else {
            //Adicionar Orçamento
            
            


            var h1 = document.getElementById('h1')
            h1.style.color = '#28A745'
            var p = document.getElementById('p')
            var voltar = document.getElementById('voltar')
            voltar.innerText = 'Voltar'
            h1.innerText = 'Registro inserido com sucesso'
            p.innerText = 'Despesa foi cadastrada com sucesso!'
            voltar.style.backgroundColor = '#28A745'
    
            setTimeout(() => {
                divalert.style.display = 'flex'
                divalert.style.animation = 'alertopen 0.2s linear 1'
            }, 150)
            sombreado.style.display = 'block'
    
            function factory(){
                
                return {
                    dia: dia.value,
                    mes: mes.value,
                    tipo: tipo.value,
                    descricao: descricao.value,
                    valor: valor.value,
                    ano: ano.value,
                }
            }
    
            class identificadora {
                constructor(){
                    let id = localStorage.getItem('id')
    
                    if(id === null){
                        localStorage.setItem('id', -1)
                    }
                }
    
                getproximoid(){
                    let proximoid = localStorage.getItem('id')
                    return parseInt(proximoid) + 1
                    
                }
    
                gravar(d){
                    let id = this.getproximoid()
    
                    localStorage.setItem(id, JSON.stringify(d))
                    localStorage.setItem('id', id)
                    
                }
            }
            
            var newdespesa = new identificadora()
    
            newdespesa.gravar(factory())
            
            ano.value = ''

            mes.value = ''

            tipo.value = ''

            dia.value = ''

            descricao.value = ''

            valor.value = ''
        }
    })
    
    closealert.forEach((e) => {
        e.addEventListener('click' , () => {
            divalert.style.animation = 'alertclose 0.1s linear 1'
            setTimeout(() => {
                sombreado.style.display = 'none'
                divalert.style.display = 'none'
            }, 100)
        })
    
    })
}




var h = window.innerHeight
setInterval(() => {
    var w = window.innerWidth
    if(w >= 700){
        menudesktop.forEach((e) => {
            e.style.display = 'none'
        })
        menumobile.style.height = 0 + 'px' 
    }

    var h = window.innerHeight
    if(sombreado !== null){
        sombreado.style.height =  h + 'px'
    } 

}, 10)




//Adicionar ao consultor


class recuperadados{
    constructor(){
        this.despesa = []
    }

    recuperar(){
        var id = localStorage.getItem('id')

        for(let i = 0; i <= id ; i++){
            let despesa = JSON.parse(localStorage.getItem(i))
            if(despesa === null) {
				continue
			} else {
                this.despesa.push(despesa)
            }
            
        }
    }
    

    formatardados(pesquisa){  
        var tbody = document.querySelector('tbody')
        var cont = 0

        if(pesquisa !== undefined){
            var todostr = document.querySelectorAll('.tr')
            for(var i = 0; i <= todostr.length - 1 ; i++){
                todostr[i].remove()
            }
            var variavelescolhida = pesquisa
        } else {
            var variavelescolhida = this.despesa
        }

        
        while(cont <= variavelescolhida.length - 1){
            
            var recebedado = variavelescolhida[cont]
            //Data
            var tr = document.createElement('tr')
            tr.className = 'tr'
            tbody.appendChild(tr)
            var tdata = document.createElement('td')
            tdata.innerText = `${recebedado.dia}/${this.tratadatas(recebedado.mes)}/${recebedado.ano}`
            tr.appendChild(tdata)
    
    
            var ttipo = document.createElement('td')
            ttipo.innerText = this.consertapt(recebedado.tipo)
            tr.appendChild(ttipo)
    
    
            var tdescricao = document.createElement('td')
            tdescricao.innerText = recebedado.descricao
    
            tr.appendChild(tdescricao)
    
    
            var tvalor = document.createElement('td')
            tvalor.innerText = `${recebedado.valor}$`
            tr.appendChild(tvalor)
           
    
            var tbtn = document.createElement('button')
            tbtn.className = 'btn'
            tbtn.innerText = 'X'
            tbtn.id = cont
            tr.appendChild(tbtn)
            cont++
        }
    }

    

    pesquisaID(despesas){
        var verif = false
        var despesasFiltradas = despesas

        dia = document.getElementById('dia')

        descricao = document.getElementById('descricao')

        valor = document.getElementById('valor')

        //Select

        ano = document.getElementById('ano')

        mes = document.getElementById('mes')

        tipo = document.getElementById('tipo')


        if(ano.value !== ''){
            console.log('Ano' , despesasFiltradas = despesasFiltradas.filter(d => d.ano == ano.value))
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == ano.value)
            verif = true
        }

        if(mes.value !== ''){
            console.log('Mes', despesasFiltradas = despesasFiltradas.filter(d => d.mes == mes.value))
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == mes.value)
            verif = true
        }

        if(dia.value !== ''){
            console.log('Dia', despesasFiltradas = despesasFiltradas.filter(d => d.dia == dia.value))
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == dia.value)
            verif = true
            
        }

        if(tipo.value !== ''){
            console.log('Tipo', despesasFiltradas = despesasFiltradas.filter(d => d.tipo == tipo.value))
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == tipo.value)
            verif = true
            
        }

        if(descricao.value !== ''){
            console.log('Descrição', despesasFiltradas = despesasFiltradas.filter(d => d.descricao == descricao.value))
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == descricao.value)
            verif = true
        }

        if(valor.value !== ''){
            console.log('Valor', despesasFiltradas = despesasFiltradas.filter(d => d.valor == valor.value))
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == valor.value)
            verif = true
        }

        if(verif == false){
            console.log('Verif')
            var todostr = document.querySelectorAll('.tr')
            for(var i = 0; i <= todostr.length - 1 ; i++){
                todostr[i].remove()
            }
            recuperadespesas.formatardados()
        }
        
        this.formatardados(despesasFiltradas)
    }

    consertapt(tipo){
        switch(tipo){
            case 'alimentacao': return 'Alimentação'
            case 'lazer' : return 'Lazer'
            case 'saude' : return 'Saúde'
            case 'transporte' : return 'Transporte' 
            case 'educacao' : return 'Educação'
        }
    }


    tratadatas(mes){
        switch(mes){
            case 'janeiro': return 1
            case 'fevereiro': return 2
            case 'março' : return 3
            case 'abril' : return 4
            case 'maio' : return 5
            case 'junho' : return 6
            case 'julho' : return 7
            case 'agosto' : return 8
            case 'setembro' : return 9
            case 'outubro' : return 10
            case 'novembro' : return 11
            case 'dezembro' :return 12
        }



    }
}


var pesquisabutton = document.getElementById('pesquisar')
pesquisabutton.addEventListener('click', () => {
    recuperadespesas.pesquisaID(recuperadespesas.despesa)
})






var recuperadespesas = new recuperadados()
recuperadespesas.recuperar()
recuperadespesas.formatardados()



var todosbtn = document.querySelectorAll('.btn')
var todostr = document.querySelectorAll('.tr')
console.log(todosbtn)
todosbtn.forEach((e) => {

    e.addEventListener('click' , () => {
        console.log(e.id)
        
        localStorage.removeItem(e.id)
        atualiza.atualizardados()
       

    })
})



class Atualizar{
    constructor(){
        this.idarray =[]
    }

    atualizardados(){
        var verif = ''
        var contanull = 0
        let contaitem = 0
        while(contanull <= 10){
            verif = JSON.parse(localStorage.getItem(contaitem))
            if(verif !== null){
                this.idarray.push(contaitem)
            } else {
                contanull++
            }

            contaitem++
        }

        if(this.idarray.length == []){
            localStorage.setItem('id', -1)
            window.location.reload()
        }

        for(let i = 0; i <= this.idarray.length - 1; i++){
            var locador = JSON.parse(localStorage.getItem(this.idarray[i]))
            localStorage.removeItem(this.idarray[i])
            localStorage.setItem( i, JSON.stringify(locador))
            console.log(this.idarray.length - 1)
            
            if(i == this.idarray.length - 1){
                localStorage.setItem('id' , i)
                window.location.reload()
                
            }
        }
    }
}

var atualiza = new Atualizar()
if(atualiza.idarray == []){
    localStorage.setItem('id', -1)
}     
              
                          
               
//Sistema
