type BoxError = Box<dyn std::error::Error>;

pub struct Buffer(String);

impl Buffer {
    pub fn new() -> Self {
        Buffer("".to_owned())
    }

    pub fn from_str(s: &str) -> Self {
        Buffer(s.to_owned())
    }

    pub fn from_string(s: String) -> Self {
        Buffer(s)
    }

    pub fn write_str(&mut self, s: &str) {
        self.0 += s;
    }

    pub fn append(&mut self, s: &Self) {
        self.0 += &s.0;
    }

    pub fn read_to_end(&mut self, writer: &mut Vec<u8>) -> Result<(), BoxError> {
        *writer = self.0.as_bytes().to_vec();
        Ok(())
    }

    pub fn size(&mut self) -> usize {
        self.0.len()
    }

    pub fn into_str(self) -> String {
        self.0
    }
}
