<%@ Page Title="Home Page" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="HelloWorld._Default" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <p>
        <asp:Label ID="lblNombre" runat="server" Text="Nombre:"></asp:Label>
        <asp:TextBox ID="txtNombre" runat="server"></asp:TextBox>
        <asp:Label ID="lblError" runat="server" ForeColor="Red"></asp:Label>
    </p>
    <p>
        <asp:Button ID="Button1" runat="server" Text="Saludar" OnClick="Button1_Click" />
    </p>
    <p>
        <asp:Label ID="lblSaludo" runat="server" Font-Size="Large"></asp:Label>
    </p>
</asp:Content>
