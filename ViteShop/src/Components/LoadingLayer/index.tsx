export default function LoadingLayer() {
    return(
        <div
        className="fixed-top"
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0, 0, 0, 0.3)",
        }}>
        <div
          className="spinner-border text-primary"
          style={{ width: "3rem", height: "3rem", fontSize: "25px" }}
        />
      </div>
    )
}