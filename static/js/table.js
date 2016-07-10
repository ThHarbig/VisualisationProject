function table(data, div) {
    var table = {
        data: data,
        div: div
    };

    table["init"] = function () {
        function sortByKey(array, key) {
            return array.sort(function (a, b) {
                var x = a[key];
                var y = b[key];
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
        }
        var hasUncert=false;
        if(d3.keys(this.data[0]).indexOf("Uncertainty")!=-1){
            hasUncert=true;
            sortByKey(this.data, "Uncertainty");
        }

        var tbl = document.createElement("table");
		tbl.classList.add("tablesorter");
        var tbody = document.createElement("tbody");
        var thead = document.createElement("thead");
        //Add a header
        var header = document.createElement("tr");

        var compHeader = document.createElement("th");
        var disorderHeader = document.createElement("th");
        var lengthHeader = document.createElement("th");
        var membraneHeader = document.createElement("th");
        var primary_accessionHeader = document.createElement("th");

        compHeader.textContent = "Computational Bias";
        disorderHeader.textContent = "Disorder";
        lengthHeader.textContent = "Length";
        membraneHeader.textContent = "Membrane";
        primary_accessionHeader.textContent = "Primary Accession";

        header.appendChild(primary_accessionHeader);
        if(hasUncert) {
            var uncertaintyHeader = document.createElement("th");
            uncertaintyHeader.textContent = "Uncertainty";
            header.appendChild(uncertaintyHeader);
        }

        header.appendChild(lengthHeader);
        header.appendChild(membraneHeader);
        header.appendChild(disorderHeader);
        header.appendChild(compHeader);

        thead.appendChild(header);
        //Add the rest of the data to the table
        for (var i = 0; i < this.data.length; i++) {
            var td_comp_bias = document.createElement("td");
            var td_disorder = document.createElement("td");
            var td_length = document.createElement("td");
            var td_membrane = document.createElement("td");
            var td_primary_accession = document.createElement("td");


            td_comp_bias.textContent = this.data[i]["Compositional Bias"];
            td_disorder.textContent = this.data[i].Disorder;
            td_length.textContent = this.data[i].Length;
            td_membrane.textContent = this.data[i].Membrane;
            td_primary_accession.textContent = this.data[i].Primary_Accession;

            var tr_body = document.createElement("tr");

            tr_body.appendChild(td_primary_accession);
            if(hasUncert){
                var td_uncertainty = document.createElement("td");
                td_uncertainty.textContent = this.data[i].Uncertainty;
                tr_body.appendChild(td_uncertainty);
            }
            tr_body.appendChild(td_length);
            tr_body.appendChild(td_membrane);
            tr_body.appendChild(td_disorder);
            tr_body.appendChild(td_comp_bias);

            tbody.appendChild(tr_body);
        }

        tbl.appendChild(thead);
        tbl.appendChild(tbody);
        document.getElementById(div).appendChild(tbl);

        tbl.style.border = "1px solid #000";
        $("table").tablesorter();
    };
    table["update"]=function (newData) {
        d3.selectAll("#"+div).selectAll("table").remove();
        this.data=newData;
        this.init()
    };


    return table;

}