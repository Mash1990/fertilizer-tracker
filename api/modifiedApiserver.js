const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const { FileSystemWallet, Gateway } = require("fabric-network");
const cors = require("cors"); // Import the cors middleware

// Resolve the path to the connection profile (ccp) file.
const ccpPath = path.resolve(
  __dirname,
  "..",
  "..",
  "first-network",
  "connection-org1.json"
);
const walletPath =
  "/home/mash/fabric14/fabric-samples/fabcar/javascript/wallet";
const wallet = new FileSystemWallet(walletPath);

//app.use(cors());
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from this origin
    methods: "GET,POST", // Specify allowed HTTP methods
    credentials: true, // Allow cookies and authentication headers
  })
);
app.use(express.json());

app.get("/api/queryallfertilizers", async (req, res) => {
  try {
    // Check if the user identity named "admin" exists in the wallet.
    const userIdentity = await wallet.exists("admin");
    if (!userIdentity) {
      console.log(
        'An identity for the user "admin" does not exist in the wallet'
      );
      console.log("Run the registerUser.js application before retrying");
      return res.status(400).json({ error: "User identity not found" });
    }

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccpPath, {
      wallet,
      identity: "admin",
      discovery: { enabled: true, asLocalhost: true },
    });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork("mychannel");

    // Get the contract from the network.
    const contract = network.getContract("fabcar");

    // Evaluate the "queryAllCars" transaction (no arguments).
    const result = await contract.evaluateTransaction("queryAllFertilizers");
    console.log(JSON.parse(result)[0]["Record"]);
    console.log(
      `Transaction has been evaluated, result is: ${result.toString()}`
    );
    return res.status(200).json({ response: result.toString() });
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    return res.status(500).json({ error: error.message });
  }
});

app.post("/api/addfertilizer", async (req, res) => {
  try {
    // Check if the user identity named "admin" exists in the wallet.
    const userIdentity = await wallet.exists("admin");
    if (!userIdentity) {
      console.log(
        'An identity for the user "admin" does not exist in the wallet'
      );
      console.log("Run the registerUser.js application before retrying");
      return res.status(400).json({ error: "User identity not found" });
    }

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccpPath, {
      wallet,
      identity: "admin",
      discovery: { enabled: true, asLocalhost: true },
    });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork("mychannel");

    // Get the contract from the network.
    const contract = network.getContract("fabcar");

    // Extract fertilizer details from the request body.
    //const { fertilizer_id, fertilizer_type, fertilizer_purpose } = req.body;

    // Submit the createFertilizer transaction.
    await contract.submitTransaction(
      "createFertilizer",
      req.body.fertilizer_id,
      req.body.fertilizer_type,
      req.body.fertilizer_manufacturer
    );
    console.log("Fertilizer transaction has been submitted");

    // Disconnect from the gateway.
    await gateway.disconnect();

    return res.status(200).json({ message: "Fertilizer added successfully" });
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    return res.status(500).json({ error: error.message });
  }
});

app.post("/api/createorder", async (req, res) => {
  try {
    // Check if the user identity named "admin" exists in the wallet.
    const userIdentity = await wallet.exists("admin");
    if (!userIdentity) {
      console.log(
        'An identity for the user "admin" does not exist in the wallet'
      );
      console.log("Run the registerUser.js application before retrying");
      return res.status(400).json({ error: "User identity not found" });
    }

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccpPath, {
      wallet,
      identity: "admin",
      discovery: { enabled: true, asLocalhost: true },
    });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork("mychannel");

    // Get the contract from the network.
    const contract = network.getContract("fabcar"); // Replace 'mycontract' with your actual contract name

    // Extract order details from the request body.
    const { farmerId, orderId, fertilizerRequested } = req.body;

    // Submit the createOrder transaction.
    await contract.submitTransaction(
      "createOrder",
      farmerId,
      orderId,
      fertilizerRequested
    );
    console.log("Order transaction has been submitted");

    // Disconnect from the gateway.
    await gateway.disconnect();

    return res.status(200).json({ message: "Order created successfully" });
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    return res.status(500).json({ error: error.message });
  }
});

app.post("/api/changeowner", async (req, res) => {
  try {
    // Check if the user identity named "admin" exists in the wallet.
    const userIdentity = await wallet.exists("admin");
    if (!userIdentity) {
      console.log(
        'An identity for the user "admin" does not exist in the wallet'
      );
      console.log("Run the registerUser.js application before retrying");
      return res.status(400).json({ error: "User identity not found" });
    }

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccpPath, {
      wallet,
      identity: "admin",
      discovery: { enabled: true, asLocalhost: true },
    });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork("mychannel");

    // Get the contract from the network.
    const contract = network.getContract("fabcar"); // Replace 'fabcar' with your actual contract name

    // Extract fertilizer details from the request body.
    const { fertilizerId, newOwner } = req.body;

    // Submit the changeFertilizerOwner transaction.
    await contract.submitTransaction(
      "changeFertilizerOwner",
      fertilizerId,
      newOwner
    );
    console.log("Fertilizer owner changed successfully");

    // Disconnect from the gateway.
    await gateway.disconnect();

    return res
      .status(200)
      .json({ message: "Fertilizer owner changed successfully" });
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    return res.status(500).json({ error: error.message });
  }
});

app.post("/api/requestChangeOwner", async (req, res) => {
  try {
    // ... (other parts of the code remain unchanged)
    const userIdentity = await wallet.exists("admin");
    if (!userIdentity) {
      console.log(
        'An identity for the user "admin" does not exist in the wallet'
      );
      console.log("Run the registerUser.js application before retrying");
      return res.status(400).json({ error: "User identity not found" });
    }

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccpPath, {
      wallet,
      identity: "admin",
      discovery: { enabled: true, asLocalhost: true },
    });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork("mychannel");

    // Get the contract from the network.
    const contract = network.getContract("fabcar");
    // Extract fertilizer details from the request body.
    const { fertilizerId, newOwner } = req.body;

    // Submit the changeFertilizerOwner transaction.
    await contract.submitTransaction(
      "changeFertilizerOwner",
      fertilizerId,
      newOwner
    );
    console.log("Fertilizer owner change requested successfully");

    // Disconnect from the gateway.
    await gateway.disconnect();

    return res.status(200).json({
      message: "Fertilizer owner change requested successfully",
    });
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    return res.status(500).json({ error: error.message });
  }
});

app.post("/api/acceptTransfer", async (req, res) => {
  try {
    // Check if the user identity exists in the wallet.
    const userIdentity = await wallet.exists(req.body.newOwner);
    if (!userIdentity) {
      console.log(
        `An identity for the user "${req.body.newOwner}" does not exist in the wallet`
      );
      console.log("Run the registerUser.js application before retrying");
      return res.status(400).json({ error: "User identity not found" });
    }

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccpPath, {
      wallet,
      identity: req.body.newOwner,
      discovery: { enabled: true, asLocalhost: true },
    });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork("mychannel");

    // Get the contract from the network.
    const contract = network.getContract("fabcar"); // Replace 'fabcar' with your actual contract name

    // Extract fertilizer details from the request body.
    const { fertilizerId } = req.body;

    // Submit the acceptTransfer transaction.
    await contract.submitTransaction(
      "acceptTransfer",
      fertilizerId,
      req.body.newOwner
    );
    console.log("Fertilizer transfer accepted successfully");

    // Disconnect from the gateway.
    await gateway.disconnect();

    return res
      .status(200)
      .json({ message: "Fertilizer transfer accepted successfully" });
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    return res.status(500).json({ error: error.message });
  }
});

app.get("/api/querypendingorders", async (req, res) => {
  try {
    const userIdentity = await wallet.exists("admin");
    if (!userIdentity) {
      console.log(
        'An identity for the user "admin" does not exist in the wallet'
      );
      console.log("Run the registerUser.js application before retrying");
      return res.status(400).json({ error: "User identity not found" });
    }

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccpPath, {
      wallet,
      identity: "admin",
      discovery: { enabled: true, asLocalhost: true },
    });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork("mychannel");

    // Get the contract from the network.
    const contract = network.getContract("fabcar"); // Replace 'fabcar' with your actual contract name

    // Query all pending orders.
    const result = await contract.evaluateTransaction("queryAllPendingOrders");
    const pendingOrders = JSON.parse(result.toString());

    // Disconnect from the gateway.
    await gateway.disconnect();

    return res.status(200).json(pendingOrders);
  } catch (error) {
    console.error(`Failed to query pending orders: ${error}`);
    return res.status(500).json({ error: error.message });
  }
});

app.post("/api/finalizeOrder", async (req, res) => {
  try {
    // Check if the user identity exists in the wallet.
    const userIdentity = await wallet.exists(req.body.userId);
    if (!userIdentity) {
      console.log(
        `An identity for the user "${req.body.userId}" does not exist in the wallet`
      );
      console.log("Run the registerUser.js application before retrying");
      return res.status(400).json({ error: "User identity not found" });
    }

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccpPath, {
      wallet,
      identity: req.body.userId,
      discovery: { enabled: true, asLocalhost: true },
    });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork("mychannel");

    // Get the contract from the network.
    const contract = network.getContract("fabcar"); // Replace 'fabcar' with your actual contract name

    // Extract order details from the request body.
    const { orderId } = req.body;

    // Submit the finalizeOrder transaction.
    await contract.submitTransaction("finalizeOrder", orderId);
    console.log("Order finalized successfully");

    // Disconnect from the gateway.
    await gateway.disconnect();

    return res.status(200).json({ message: "Order finalized successfully" });
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    return res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
