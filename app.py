from flask import Flask, render_template, request

app = Flask(__name__)


@app.route("/")
def inicio():
    return render_template("inicio.html")


@app.route("/niveis")
def niveis():
    aluno = request.args.get("aluno", "")
    return render_template("niveis.html", aluno=aluno)


@app.route("/atividade")
def atividade():
    return render_template("atividade.html")

@app.route("/atividade2")
def atividade2():
    return render_template("atividade2.html")

if __name__ == "__main__":
    app.run(debug=True)