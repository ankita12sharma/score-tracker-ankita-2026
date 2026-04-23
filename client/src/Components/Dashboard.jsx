import React, { useState, useMemo } from "react";
import { Grid } from "@mui/material";

import {
  Box,
  Drawer,
  List,
  ListItemText,
  ListItemButton,
  Typography,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  IconButton,
  TextField,
  Button,
} from "@mui/material";

import * as Icons from "@mui/icons-material";

const MenuIcon = Icons.Menu;
const EmojiEventsIcon = Icons.EmojiEvents;
const StarIcon = Icons.Star;
const EqualizerIcon = Icons.Equalizer;
const SchoolIcon = Icons.School;

import { handleSuccess, handleError } from "../../utils";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import {
  useGetScoreByIdQuery,
  useAddScoreMutation,
} from "../redux/slices/scoreSlice";

const drawerWidth = 240;

const Dashboard = () => {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => setOpen(!open);

  const [scoreInput, setScoreInput] = useState("");
  const [date, setDate] = useState("");

  const user = useMemo(() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : {};
    } catch (e) {
      return {};
    }
  }, []);

  const userId = user?._id || user?.data?._id || user?.user?._id || null;

  const {
    data: scoresData,
    isLoading,
    isError,
  } = useGetScoreByIdQuery(userId, { skip: !userId });

  const safeScores = scoresData?.data || [];

  const totalScore = safeScores.reduce(
    (sum, item) => sum + Number(item?.score || 0),
    0,
  );

  const latestScore =
    safeScores.length > 0 ? safeScores[safeScores.length - 1]?.score : 0;

  const avgScore =
    safeScores.length > 0 ? (totalScore / safeScores.length).toFixed(2) : 0;

  const [addScore] = useAddScoreMutation();

  const chartData = safeScores.map((s, i) => ({
    day: `Day ${i + 1}`,
    score: Number(s?.score || 0),
  }));

  const handleAddScore = async () => {
    if (!scoreInput || !date || !userId) {
      handleError("Missing fields or user not found");
      return;
    }

    try {
      await addScore({
        userId,
        score: Number(scoreInput),
        date,
      }).unwrap();

      setScoreInput("");
      setDate("");

      setTimeout(() => {
        handleSuccess("Record added successfully!!");
      }, 100);
    } catch (err) {
      handleError("Unable to add record!!");
      console.log(err);
    }
  };

  const cardColors = [
    "linear-gradient(135deg, #6366f1, #8b5cf6)",
    "linear-gradient(135deg, #22c55e, #4ade80)",
    "linear-gradient(135deg, #f59e0b, #fbbf24)",
    "linear-gradient(135deg, #ef4444, #f87171)",
  ];

  const cards = [
    { title: "Total Scores", value: totalScore, icon: EmojiEventsIcon },
    { title: "Latest Score", value: latestScore, icon: StarIcon },
    { title: "Average Score", value: avgScore, icon: EqualizerIcon },
    { title: "Charity", value: "Education", icon: SchoolIcon },
  ];

  return (
    <Box sx={{ display: "flex", height: "100vh", width: "100vw" }}>
      <Drawer
        variant="persistent"
        open={open}
        sx={{
          width: drawerWidth,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            background: "#8b5cf6",
            color: "#fff",
          },
        }}
      >
        <Typography sx={{ p: 2, fontSize: "28px", fontWeight: "bold" }}>
          Golf App
        </Typography>

        <List>
          {["Dashboard", "Scores", "Charity"].map((text) => (
            <ListItemButton key={text}>
              <ListItemText primary={text} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <AppBar
          position="fixed"
          sx={{
            ml: open ? `${drawerWidth}px` : 0,
            width: open ? `calc(100% - ${drawerWidth}px)` : "100%",
            background: "#ffffff",
            color: "#000",
          }}
        >
          <Toolbar>
            <IconButton onClick={toggleDrawer}>
              {MenuIcon && <MenuIcon />}
            </IconButton>

            <Typography sx={{ ml: 2, fontWeight: "bold" }}>
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar>

        <Toolbar />

        <Box sx={{ flexGrow: 1, p: 3, mt: 2 }}>
          {isLoading && <Typography>Loading data...</Typography>}
          {isError && <Typography>Error fetching data</Typography>}

          <Grid container spacing={3}>
            {cards.map((item, i) => {
              const Icon = typeof item.icon === "function" ? item.icon : null;

              return (
                <Grid item xs={12} sm={4} md={3} key={i}>
                  <Card
                    sx={{
                      minHeight: 180,
                      borderRadius: 4,
                      color: "#fff",
                      background: cardColors[i],
                    }}
                  >
                    <CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box>
                          <Typography sx={{ fontSize: 20, fontWeight: 700 }}>
                            {item.title}
                          </Typography>

                          <Typography variant="h4" fontWeight="bold">
                            {item.value}
                          </Typography>
                        </Box>

                        {Icon && <Icon sx={{ fontSize: 40 }} />}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>

          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid item xs={12} lg={8}>
              <Card sx={{ minHeight: 320, borderRadius: 4 }}>
                <CardContent>
                  <Typography variant="h5" align="center">
                    Add Score
                  </Typography>

                  <TextField
                    label="Score"
                    fullWidth
                    margin="normal"
                    value={scoreInput}
                    onChange={(e) => setScoreInput(e.target.value)}
                  />

                  <TextField
                    type="date"
                    fullWidth
                    margin="normal"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />

                  <Button
                    fullWidth
                    variant="contained"
                    onClick={handleAddScore}
                  >
                    Add Score
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} lg={4}>
              <Card sx={{ minHeight: 320, borderRadius: 4 }}>
                <CardContent>
                  <Typography variant="h5" align="center">
                    Recent Scores
                  </Typography>

                  {safeScores.length === 0 ? (
                    <Typography>No data found</Typography>
                  ) : (
                    safeScores.map((s, i) => (
                      <Typography key={s._id || i}>
                        Score: {s.score} | {s.date}
                      </Typography>
                    ))
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {chartData.length > 0 && (
            <Grid container spacing={4} sx={{ mt: 2 }}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography align="center">Score Distribution</Typography>

                    <ResponsiveContainer width="100%" height={240}>
                      <BarChart data={chartData}>
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="score" fill="#1d4ed8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography align="center">Score Trend</Typography>

                    <ResponsiveContainer width="100%" height={240}>
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="score"
                          stroke="#1d4ed8"
                          strokeWidth={3}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
