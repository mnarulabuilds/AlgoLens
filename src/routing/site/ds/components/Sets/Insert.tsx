import React from "react"

// Basic styling using CSS-in-JS (can be moved to a CSS file)
const styles = {
  card: {
    border: "1px solid rgba(22,45,167,0.9)",
    borderRadius: "8px",
    padding: "16px",
    maxWidth: "400px",
    margin: "0 auto",
    backgroundColor: "#f8f9fa",
  },
  cardHeader: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "8px 16px",
    borderRadius: "8px 8px 0 0",
  },
  cardContent: {
    textAlign: "center",
    padding: "16px",
  },
  inputField: {
    width: "100%",
    padding: "10px",
    margin: "8px 0",
    borderRadius: "4px",
    border: "1px solid #ced4da",
  },
  button: {
    marginTop: "8px",
    padding: "10px 16px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#007bff",
    color: "white",
    cursor: "pointer",
  },
}

export default function Insert(props) {
  const [data, setData] = React.useState(null) // stores the data entered in the list

  if (props.open) {
    return (
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <h2>Insert</h2>
        </div>

        <div style={styles.cardContent}>
          <h3>Enter data</h3>
          <input
            type="text"
            placeholder="Enter Data"
            style={styles.inputField}
            onChange={(event) => setData(event.target.value)}
            value={data || ""}
          />
          <button
            style={styles.button}
            onClick={() => {
              props.insert(data) // calling the insert function of the parent component
              setData(null)
            }}
          >
            Submit
          </button>
        </div>
      </div>
    )
  } else {
    return <div></div>
  }
}
