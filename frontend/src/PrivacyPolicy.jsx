
import { Container, Typography, Box } from '@mui/material';

const PrivacyPolicy = () => {
  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Privaatsuspoliitika
      </Typography>
      <Typography variant="body2" gutterBottom>
        Viimati uuendatud: Mai 2025
      </Typography>

      <Box my={4}>
        <Typography variant="h6" gutterBottom>
          1. Kogutavad andmed
        </Typography>
        <Typography>
          Me kogume järgmisi isikuandmeid: e-posti aadress, telefoninumber, mis on vajalikud kaotatud või leitud ketaste info esitamiseks.
        </Typography>
      </Box>

      <Box my={4}>
        <Typography variant="h6" gutterBottom>
          2. Kuidas andmeid kasutatakse
        </Typography>
        <Typography>
          Teie isikuandmeid kasutatakse ainult selleks, et kuvada Teie postitust ja võimaldada inimestel Teiega ühendust võtta.
        </Typography>
      </Box>

      <Box my={4}>
        <Typography variant="h6" gutterBottom>
          3. Andmete jagamine
        </Typography>
        <Typography>
          Me ei jaga Teie andmeid kolmandate osapooltega ilma Teie selge nõusolekuta.
        </Typography>
      </Box>

      <Box my={4}>
        <Typography variant="h6" gutterBottom>
          4. Andmete turvalisus
        </Typography>
        <Typography>
          Andmeid hoitakse turvalises keskkonnas ja neid töödeldakse ainult vastavalt seadustele.
        </Typography>
      </Box>

      <Box my={4}>
        <Typography variant="h6" gutterBottom>
          5. Teie õigused
        </Typography>
        <Typography>
          Teil on õigus küsida oma andmete kohta, neid parandada või kustutada. Selleks võtke meiega ühendust.
        </Typography>
      </Box>
    </Container>
  );
};

export default PrivacyPolicy;
